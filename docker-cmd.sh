#!/bin/sh

if [ -f pnpm-lock.yaml ]; then
	pnpm install;
else
	echo "Lockfile not found." && exit 1;
fi

pnpm run dev

