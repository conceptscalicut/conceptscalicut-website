"""Netlify 'ignore' check. Exit 1 = build and deploy; exit 0 = skip this commit (no credits used)."""
import os
import re
import subprocess
import sys


def git(*args):
    return subprocess.run(['git', *args], capture_output=True, text=True).stdout


def build(reason):
    print('BUILD:', reason)
    sys.exit(1)


def skip(reason):
    print('SKIP:', reason)
    sys.exit(0)


if os.environ.get('INCOMING_HOOK_URL'):
    build('started by a build hook')

msg = git('log', '-1', '--pretty=%B')
if '[publish]' in msg:
    build('commit asks to publish')

head = os.environ.get('COMMIT_REF') or 'HEAD'
cached = os.environ.get('CACHED_COMMIT_REF')
if not cached or cached == head:
    build('no previous deploy to compare with')

changed = git('diff', '--name-only', cached, head)
if not changed.strip() and git('cat-file', '-t', cached).strip() != 'commit':
    build('previous deploy not in history')

for path in changed.split():
    if path.startswith('blog/posts/') and path.endswith('.md') and os.path.exists(path):
        front = open(path, encoding='utf8').read().split('---')
        meta = front[1] if len(front) > 2 else ''
        if re.search(r'^publish_now:\s*true\s*$', meta, re.M) and not re.search(r'^draft:\s*true\s*$', meta, re.M):
            build(f'{path} is marked Publish immediately')

skip('saved for the next Monday publish')
