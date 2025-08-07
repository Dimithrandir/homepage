#!/bin/sh

# pick a number of random images from a directory and insert them into homepage consts

pics_dir="img/"
consts_file="consts.js"
n=3
# get n random pics
all_pics="$(find "$pics_dir" -type f)"
picked_pics=$(echo "$all_pics" | shuf -n "$n")
# string to inject into .js script
inject_string=""
for pic in $picked_pics ; do
	[ -d "$pic" ] && continue
	inject_string="$inject_string\"${pic##"$pics_dir"}\","
done
# add '\' before '/' and remove last comma
inject_string=$(echo "$inject_string" | sed 's/\//\\\//g' | rev | cut -c 2- | rev)
# substitute 2nd line in consts.js
sed -i "2s/\[.*\]/\[$inject_string\]/" "$consts_file"

exit 0
