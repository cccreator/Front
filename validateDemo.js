 
  $( "#frm" ).validate({
      rules: {
          username: {
              required: true,
              minlength: 4,
              maxlength: 20,
              byteMaxLength:20,
              valiEnglish:true
          },
          postcode: {
             postcodeVal:true
            },
          number: {
            byteMaxLength:5,
            numFormat:5
            },
            identifier: {
            sfzhValidate:true  
          }
             
             
           
      },
      messages: {
          username: {
              required: "请输入用户名4--20个英文字符",
              minlength: $.format("Keep typing, at least {0} characters required!"),
              maxlength: $.format("Whoa! Maximum {0} characters allowed!")
          },
          number: {
              numFormat: $.format("请输入{0}数字")
            }
      }
  });