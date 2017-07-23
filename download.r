comment("
download.r:
Download the data for the present project:
Thailand / U.S. Foreign Exchange Rate [Daily]
FRED Series ID: DEXTHUS

There is a command line version of the present program in 'download.cmd'.
")

#The call to source is enclosed in a tryCatch because fred_download will generate an error when the present file is run from the command line. This error is spurious and should not stop program execution.
tryCatch(source('fred_download.r'),
	error = function(e) {
		#Brackets must surround the parentheses below because in a regular expression
		if (length(grep('length(series_id) == 1', e$message, fixed=TRUE)) == 0) {
			stop(e)
		}
	}
)

download = function() {
	fred_download('DEXTHUS')
}
