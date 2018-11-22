# Flybase-Export

Flybase-export is a helper utility for export large JSON files into [Flybase](https://www.flybase.io/). It
breaks the JSON into smaller chunks and uploads them individually through the Flybase API.

## Installing

Install the flybase-export module globally:

    $ npm install -g flybaseio/flybase-export

or install it locally and add it to your path:

    $ npm install flybaseio/flybase-export
    $ export PATH=$PATH:`npm bin`

## Usage

    $ flybase-export
    Usage: flybase-export

    Options:
      --flybase_key, -k          Flybase API Key.                                                          [required]
      --flybase_app, -a          Flybase App name.                                                         [required]
      --flybase_collection, -c   Flybase collection name.                                                  [required]
      --json, -j                 The JSON file to export.                                                  [required]


## Example

    $ flybase-export --flybase_key API-KEY --flybase-app Test --flybase_collection Stuff --json test.json
    export completed.
