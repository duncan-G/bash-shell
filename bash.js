const bash = {
  pwd: process.cwd()
};

process.stdout.write('prompt > ');

process.stdin.on('data', data => {
  process.stdout.write(data);
  const cmd = data.toString().trim();

  process.stdout.write(bash[cmd] || '');
  process.stdout.write('\nprompt > ');
});
