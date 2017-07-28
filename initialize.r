comment("
initialize.r:
Initialize the data files required by the present project.

The present script can be run from the command line:

rscript initialize.r

It can also be loaded into the R GUI and run from there.
")
source('fred_download.r')
source('pchange.r')
source('to_js.r')
series_id = 'DEXTHUS'
fred_download(series_id)
to_js(series_id)
pchange(series_id)
file = paste(series_id, '_pchange', sep='')
to_js(file)
