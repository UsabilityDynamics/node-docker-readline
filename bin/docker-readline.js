#!/usr/local/bin/node

var readline = require('readline');
var util = require( 'util' );
var shelljs = require('shelljs');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.setPrompt('Container > ');
rl.prompt();

rl.on('line', function(line) {

  var entry = line.trim();

  var _args = entry.split( " " );
  var _command = _args.splice( 0, 1 ) || [ '/bin/bash' ];

  console.log( '_command', _command );
  console.log( '_args', _args );

  switch(line.trim()) {

    case 'hello':
      console.log('world!');
    break;

    case 'hosts':
      console.log('...wip...');
    break;

    case 'info':

      console.log(util.inspect( getInfo(), { showHidden: true, depth: 4 }));

      //console.log( getInfo());
    break;

    case 'stop':
      console.log( 'Stopping container, existing.');
      rl.pause();
    break;

    default:
      //console.log('Say what? I might have heard `' + line.trim() + '`');

      if( !entry ) {
        break;
      }

      module.exports.currentChild = require( 'child_process' ).spawn( _command[0], _args, {
        stdio: 'inherit'
      });

    break;

  }

  rl.prompt();

});


rl.on('close', function() {
  console.log('Have a great day!');
  process.exit(0);
});

// This will override SIGTSTP and prevent the program from going to the background.
// This happens if you persitantly press CTRL-D
rl.on('SIGTSTP', function() {
  console.log('Exiting and stopping container.');
  rl.pause();
});

// `prompt` will automatically resume the stream
rl.on('SIGCONT', function() {
  rl.prompt();
});

rl.on('SIGINT', function() {
  rl.question('Are you sure you want to exit? If not, use CTRL+P+Q, otherwise type in <yes>' + "\n", function(answer) {

    if (answer.match(/^y(es)?$/i)) {
      rl.pause();
    }

  });

});

// never happens when inside a container since the container gets stopped
rl.on('resume', function() {
  console.log('Readline resumed.');
});

rl.on('pause', function() {
  // console.log('Readline paused, stopping container and leaving.');

  if( module.exports.currentChild ) {
    module.exports.currentChild.kill();
  }

});

function getInfo() {

  return {
    hostname: require( 'os').hostname(),
    platform: require( 'os').platform(),
    tmpdir: require( 'os').tmpdir(),
    arch: require( 'os').arch(),
    loadavg: require( 'os').loadavg(),
    //cpus: require( 'os').cpus(),
    networkInterfaces: require( 'os').networkInterfaces(),
    freemem: require( 'os').freemem(),
    env: process.env,
    args: process.argv
  };

}
