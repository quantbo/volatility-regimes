comment("
to_js.r:
Convert a data frame to a Javascript object containing a set of parallel arrays and store in the indicated file.
Assuming the data frame has M rows and N columns, the file will contain a script of the following form:

let DATA = {
	'header1': [data1_1',..., 'data1_M'],
	'header2': ['data2_1',..., 'data2_M'],
	...
	'headerN': [dataN_1,..., dataN_M]
};

This is the best way to map an R data frame to an object in Javascript.

This script can be read by another script thus allowing the data to be conveniently loaded.
If appropriate the DATA array can be re-named as follows within Javascript:

let newName = DATA;
DATA = null;

As of this writing I assume that the data are of type Date or numeric (integer or double). The intended application is to time series, so this should be sufficient.

Coding note:
The program below involves loops, which means it would probably run much faster in a language like C++. However, on my laptop (MEII) it processes a CSV file with about 9500 records in well under a second. The following is a microbenchmark report:

Unit: milliseconds
             expr       min         lq       mean     median         uq        max neval
 to_js(dfr, file) 617.99573 623.144181 625.929333 624.397926 629.332679 634.776149     5

If CSV files with millions of records must be converted, this program should be rewritten in C++. However, I do not believe a browser can handle so much data, so this possibility is not likely to be encountered in the forseeable future.
")

to_js = function(dfr, file) {
	#dfr: A data frame. As noted above, columns must be Date, integer, or double.
	#file: The name of the file to write to. Only the base file name should supplied; the extension '.js' is added by the program.

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
	file = paste(file, '.js', sep='')
	sink(file)
	on.exit(sink())
	cat('let DATA = {\n')
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
