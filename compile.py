# import pdfkit
import os
import argparse

parser = argparse.ArgumentParser(description='Compile your HTML files to one')
parser.add_argument('input_folder', type=str, help='directory of input html files')
parser.add_argument('output_folder', type=str, help='directory to output to')
parser.add_argument('name', type=str, help='desired name of file')

args = parser.parse_args()

with open(args.output_folder + "/" + args.name + ".html", 'w') as outfile:
    for filename in os.listdir(args.input_folder):
        if filename.endswith(".html"):
            with open(args.input_folder + "/" + filename) as infile:
                for line in infile:
                    outfile.write(line)


# pdfkit.from_file(args.output_folder + "/" + args.name + ".html", args.output_folder + "/" + args.name + ".pdf") 

