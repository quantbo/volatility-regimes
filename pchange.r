comment("
pchange.r:
For the indicated CSV file containing a DATE, VALUE time series, generate the series of percentage changes.
The output columns are named DATE, VALUE as these are the canonical names used for time series by the code downstream.
")

pchange = function(basename) {
	#basename: Base name of the input CSV file, omitting the '.csv' extension; the latter is added by the program.
	file_in = paste(basename, '.csv', sep='')
	dfr = read.csv(file_in)
	nr = nrow(dfr)
	dfr$last = c(NA, dfr$VALUE[1:(nr-1)])
	dfr$VALUE = 100 * (dfr$VALUE / dfr$last - 1)
	file_out = paste(basename, '_pchange.csv', sep='')
	dfr = dfr[c('DATE', 'VALUE')]
	write.csv(dfr, file=file_out, row.names=FALSE)
	return(invisible(dfr))
}
