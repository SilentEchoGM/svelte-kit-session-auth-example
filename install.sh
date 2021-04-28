#!/bin/bash

echo "Installing Hyperspace"
npm i -g @hyperspace/cli
npm i hyperspace
npm i hyperbee
echo "Installing packages"
npm i
echo "Install conplete, starting hyperspace daemon"
hyp daemon start
hyp daemon status
echo "Ready, this prompt can now be closed"
read -sp 'press enter to exit...' var
exit 0