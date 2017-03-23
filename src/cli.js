var _ = require("lodash");

var args = require("minimist")(process.argv.slice(2), {
  "boolean": ["help", "version"],
  "alias": {
    "help": "h",
    "version": "v",
  }
});

if(args.help){
  console.log("");
  console.log("USAGE");
  console.log("");
  console.log("    kjv [--version|-v] [--help|-h] [--] [<refs>...]");
  console.log("");
  return;
}
if(args.version){
  console.log(require("../package.json").version);
  return;
}

console.log("TODO open", args._.join(" "));
