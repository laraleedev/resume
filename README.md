Based on https://github.com/posquit0/Awesome-CV

`xelatex resume.tex` to build

## Usage
Import the files into Overleaf and set the compiler to XeLaTeX

## Experience generator
Handles creation of abbreviated and full versions of experience to adjust resume length down as needed. This way only one set of experience data needs to be maintained

Built using node v18.16.0

Generates two files: `_FULL-experience.tex` and `experience.tex`, based on the data in `experience.json`. Latter output is abbreviated based on setting `"exclude": true` in the json.

Run: `node ./generateExperience.mjs`. Assumes resume folder is created. Import output into overleaf as usual