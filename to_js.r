comment("
to_js.r:
Convert a CSV file to a Javascript object containing a set of parallel arrays and store in the indicated file.
Assuming the data have M rows and N columns, the file will contain a script of the following form:

let DATA = {
	'header1': [data1_1',..., 'data1_M'],
	'header2': ['data2_1',..., 'data2_M'],
	...
	'headerN': [dataN_1,..., dataN_M]
};


The intended application is to time series; consequently, it is assumed that the data are of type Date or numeric (integer or double).

Coding note:
The program below involves loops, which means it would probably run much faster in a language like C++. However, on my laptop (MEII) it processes a CSV file with about 9500 records in well under a second. The following is a microbenchmark report:

Unit: milliseconds
             expr       min         lq       mean     median         uq        max neval
 to_js(dfr, file) 617.99573 623.144181 625.929333 624.397926 629.332679 634.776149     5

If CSV files with millions of records must be converted, this program should be rewritten in C++. However, I do not believe a browser can handle so much data, so this possibility is not likely to be encountered in the near to medium term future.
")

to_js = function(basename) {
	#basename: The base name (omitting extension) of the input and output files.

	csv_file = paste(basename, '.csv', sep='')
	dfr = read.csv(csv_file)

	#Put quotes around the members of a vector.
	quotes = function(vec) {
		paste("'", vec, "'", sep='')
	}

	#Put quotes around non-numeric data.
	nmz = names(dfr)
	for (nm in nmz) {
		#The double brackets below are critical; dfr[nm] is a list of length 1, not a vector.
		if (!is.numeric(dfr[[nm]])) dfr[[nm]] = quotes(dfr[[nm]])
	}
	#Put quotes around column names.
	nmz = quotes(names(dfr))

	#Write NA as null.
	catNA = function(x) {
		cat('\t\t')
		if (is.na(x)) {
			cat('null')
		} else {
			cat(x)
		}
	}

	NN = length(nmz) #Number of columns.
	RR = nrow(dfr) #Number of rows.
	js_file = paste(basename, '.js', sep='')
	sink(js_file)
	on.exit(sink())
	cat('DATA = {\n')
	for (ii in 1:NN) {
		cat('\t', nmz[ii], ': [\n', sep='')
		for (jj in 1:RR) {
			catNA(dfr[jj, ii])
			if (jj < RR) {
				cat(',\n')
			} else {
				cat(']')
			}
		}
		if (ii < NN) {
			cat(',\n')
		} else {
			cat('\n')
		}
	}
	cat('}\n')
}
