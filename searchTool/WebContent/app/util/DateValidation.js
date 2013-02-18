Ext.apply(Ext.form.field.VTypes, {
       DateRange: function(val, field) {
           //want to allow for a single or both being blank
           var date = field.parseDate(val);
           //initial setting is ignored
           if (Ext.Date.format(new Date(),'m/d/Y') == val || val == Ext.Date.format(Ext.Date.add(new Date(),Ext.Date.MONTH,-1),'m/d/Y'))
               return true;
           //return false if a date couldn't be parsed
           if (val != null && !date) {
               return false;
           }
           
           //allow nulls through
           if (field.startDateField && (!field.dateRangeMax || date === null || (date.getTime() != field.dateRangeMax.getTime()))) {
               var start = field.up(field.ownerCt.xtype).down('datefield[vfield=searchFromDate]');
               if (date && date < new Date())
                    start.setMaxValue(date);
               else
                    start.setMaxValue(new Date());
               start.validate();
               field.dateRangeMax = date;
           }
           //nulls allowed here as well
           else if (field.endDateField && (!field.dateRangeMin || date === null || (date.getTime() != field.dateRangeMin.getTime()))) {
               var end = field.up(field.ownerCt.xtype).down('datefield[vfield=searchToDate]');
               end.setMinValue(date);
               end.validate();
               field.dateRangeMin = date;
           }
           /*
            * Always return true since we're only using this vtype to set the
            * min/max allowed values (these are tested for after the vtype test)
            */
           return true;
       },
       DateRangeText: 'From Date must be before To Date'
});