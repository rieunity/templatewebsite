---
layout: post
title: Write Your Own Class and Package files
categories: computer
---
The file that contains the information about how to turn logical structure (like
‘\chapter’) into formatting (like ‘18pt bold ragged right’) is a document class. In addition, some features (such as colour or included graphics) are independent
of the document class and these are contained in packages.This post is a short guide to make custome class files and packages.

The structure of the file is always the same, it consist of six parts:
* Identification
* Initial Code
* Declaration of Options
* Execution of Options
* Package Loading
* Main Code

## Iddentification
First a class or package file must identify itself throught the following commands, for packages:
```latex
\NeedsTeXFormat{LaTeX2e}
\ProvidesPackage{<package name>}[<date> <other information>]
```

and for class files:
```latex
\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{<class name>}[<date> <other information>]
```

For example:
```latex
\NeedsTeXFormat{LaTeX2e}
\ProvidesPackage{latexsym}[1994/06/01 Standard LaTeX package]
```

and
```latex
\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{rieunity}[2017/06/17 v0.01 Rieunity's Lecture Notes Style]
```

The date should be given in the form 'YYYY/MM/DD', 'v0.01' is the version, 'Rieunity's Lecture Notes Style' is a label which only appears in the log file.

If we write `\documentclass{rieunity}[1995/04/03]`, it means that the class we used must be released after 1995/04/03.

## Initial Code
We can specify any valid LaTeX code in this part, including code that
loads packages with the \RequirePackage command if their
code is required in one of the option declarations.  

## Declaration of Options
All options of the package or class are defined here using the `\DeclareOption` command. The usage of this cammand is 
```latex
\DeclareOption{option}{code}
```
The argument `option` is the name of the option, the argument `code` is the code that will excute if this option is requisited. For example the paper size option a4paper normally has a definition of the following form:
```latex
\DeclareOption{a4paper}{\setlength\paperheight{297mm}%
\setlength\paperwidth{210mm}}
``` 
We can pass these options to some other packages which is loaded in the **Package Loading** part by using the following
```latex
\PassOptionsToPackage{option-list}{package-name}
``` 
For example, if we have an option named 'infoshow' and the package A we load also has this option, then we can pass this option to the package A by following
```latex
\DeclareOption{infoshow}{ %
\PassOptionsToPackage{infoshow}{A} %
<code to support infoshow in the class>}
```
If we do not recognize the 'infoshow' in the **Declaration of Options** part, we can still use this option in the global condition `\documentclass[infoshow]{rieunity}` by following
```latex
\DeclareOption*{\PassOptionsToPackage{\CurrentOption}{A}}
```

## Execution of Options
We may want to set some defaults, then we need to execute some options in this part by
```latex
\ExecuteOptions{option-list}
```
and end with
```latex
\ProcessOptions
```
or
```latex
\ProcessOptions*
```
The first executes options in the order of the declaration part, the second  process their options in
the order specified on the `\usepackage` command.

## Package Loading 
Load the packages which we have passed to options using
`\PassOptionsToPackage`. If package was not loaded before, it wil be loaded with the options specified in `option-list`.
```latex
\RequirePackage[option-list]{package}[release]
```
The optional `release` argument can be used to request a package version not
older than a certain date. 

The command
```latex
\RequirePackageWithOptions{package}[release]
```
works like `\RequirePackage` except that the options passed to
it are exactly those specified for the calling package or class. This facilitates the
generation of variant packages that take exactly the same set of options as the
original. 

## Main Code
This final part of the file defines the characteristics and implements the functions provided by the given class or package. It can contain any valid LaTeX construct and usually defines new commands and structures.

## An example of a class file extending article
```latex
% -------------------------------- identification ------------------------
\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{rieunity}[1994/01/01]
% -------------------------------- initial code -------------------------
\RequirePackage{ifthen} \newboolean{cropmarks}
% --------------------------- declaration of options --
\DeclareOption{cropmarks}{\setboolean{cropmarks}{true}}
\DeclareOption{bind}     {\AtEndOfClass{\addtolength\oddsidemargin{.5in} %
                          \addtolength\evensidemargin{-.5in}}}
\DeclareOption*          {\PassOptionsToClass{\CurrentOption}{article}}
% ---------------------------- execution of options ---------------------
\ProcessOptions \relax                            % cf. hint on p. 882!
% --------------------------------package loading ------------------------
\LoadClass{article}                               % the real code
% -------------------------------- main code ----------------------------
\newenvironment{Notes}{...}{...}                  % the new environment
\ifthenelse{\boolean{cropmarks}}                  % support for cropmarks
   {\renewcommand{\ps@plain}{...} ...}{}
```