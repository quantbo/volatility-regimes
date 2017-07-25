comment("
price_change.r:
For the indicated CSV file containing DATE, VALUE time series, generate series of price changes.
Change is measured as the percentage change over the prior trading day's value.
")

price_change = function(basename) {
	#basename: Base name of the file, omitting the '.csv' extension; the latter is added by the program.
	file_in = paste(basename, '.csv', sep='')
	dfr = read.csv(file_in)
	nr = nrow(dfr)
	dfr$last = c(NA, dfr$VALUE[1:(nr-1)])
	dfr$pct_change = 100 * (dfr$VALUE / dfr$last - 1)
	file_out = paste(basename, '_price_change.csv', sep='')
	write.csv(dfr[c('DATE', 'pct_change')], file=file_out)
	return(dfr)
}
