#!/usr/bin/env node
// @flow

import cli from 'cli';
import fs from 'fs';
import path from 'path';
import instructionsParser from './instructionsParser';

cli.enable('status');

cli.parse();

cli.main((args) => {
    if (args.length === 0) {
        cli.fatal('a file is required');
    }

    const currentPath = process.cwd();

    const [fileName] = args;
    const filePath = path.join(currentPath, fileName);
    const file = fs.readFileSync(filePath, 'utf8');

    instructionsParser(file);
});
