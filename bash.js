const bash = {
  pwd: require('./pwd.js'),
  ls: require('./ls.js')
};

const getCmd = cmdString => {
  return cmdString.split(' ')[0];
};

// Get keyword options
const getkwOptions = cmdString => {
  let i = cmdString.search('-');
  i = i === -1 ? cmdString.length : i;

  cmdString = cmdString.slice(i);
  if (cmdString.length === 0) {
    return {};
  }

  let keyWordOptions = cmdString.split(' ').reduce((kwOptions, currOpt) => {
    if (currOpt.includes('--')) {
      const key = currOpt.replace('--', '');
      kwOptions[key] = true;
      kwOptions.currOpt = key;
    } else {
      const key = kwOptions.currOpt;
      if (key !== null) {
        kwOptions[key] = currOpt;
      }
    }
    return kwOptions;
  }, {});

  delete keyWordOptions.currOpt;
  return keyWordOptions;
};

const getArgs = cmdString => {
  // '-' identifiers when options begin
  // Remove options, split string and remove command
  let i = cmdString.search('-');
  i = i === -1 ? cmdString.length : i;

  return cmdString
    .slice(0, i) // Remove options from string
    .trim() // Trim any extra spaces
    .split(' ') // Make into array
    .slice(1); // Remove the command
};

const logMsg = msg => {
  process.stdout.write(msg);
  process.stdout.write('\nprompt > ');
};

process.stdout.write('prompt > ');

process.stdin.on('data', data => {
  const cmdString = data.toString().trim();
  const cmd = getCmd(cmdString);
  const kwOptions = getkwOptions(cmdString);
  const args = getArgs(cmdString);

  console.log(cmd, args, kwOptions);
  bash[cmd]
    ? bash[cmd](args, kwOptions, logMsg)
    : logMsg(`${cmd}: command not found`);
});
