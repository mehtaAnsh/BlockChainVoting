#!/bin/sh
basedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")

case `uname` in
    *CYGWIN*|*MINGW*|*MSYS*) basedir=`cygpath -w "$basedir"`;;
esac

if [ -x "$basedir/node" ]; then
  exec "$basedir/node"  "$basedir/../mocha/bin/_mocha" "$@"
else 
  exec node  "$basedir/../mocha/bin/_mocha" "$@"
fi
