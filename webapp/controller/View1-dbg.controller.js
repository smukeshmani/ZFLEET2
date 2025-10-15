sap.ui.define(
	[
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/BindingMode",
    "sap/ui/core/message/Message",
    "sap/ui/core/MessageType",
    "sap/ui/core/ValueState",
    "sap/m/MessageToast",
    "sap/ui/core/library"
   ], 
   
   function (Controller,JSONModel, BindingMode, Message, MessageType , ValueState , MessageToast, library) {
	"use strict";

	return Controller.extend("ZGBC_FLEET_RETURN.ZGBC_FLEET_RETURN.controller.View1", {
		
		onInit: function () {
		          var oMessageManager,oView;
		            oView = this.getView();
		            oMessageManager = sap.ui.getCore().getMessageManager();
		            oView.setModel(oMessageManager.getMessageModel(), "message");
		            
		            var oData = {
		            	         Vehicleid:"",
		            	         VehicleName:"",
		            	         VehicleNumber:"",
		            	         Plant:"",
		            	         Location:"",
		            	         VehicleDetVisible:false,
		            	         SumitRequestVisible:false
		                        };
		            this.oLocalModel =  new sap.ui.model.json.JSONModel(oData);
		            oView.setModel(this.oLocalModel,"localModel");
		            
		            var oDataResponse = {
		            	                Response :[],
		            	                Text:'',
		            	                Type:'',
		            	                Visible:false
		                                };
		            this.oLocalModel2 = new sap.ui.model.json.JSONModel(oDataResponse);
		            oView.setModel(this.oLocalModel2,"localModel2");                    
		    },
		   
		
		  onSubmit: function (oEvent) {
					var Pernr = oEvent.getSource().getValue();
					var that = this;
					var sPath = "/EmployeeDetailsSet('" + Pernr + "')";
				    var oModel = this.getView().getModel();
		            	oModel.read(sPath, {
			                 	success: function(oData, response){
				                       	    var oModel3 = new sap.ui.model.json.JSONModel(oData);
					                        var osf = that.getView().byId("IdEmpDetail");
					                        osf.setModel(oModel3);

                                            that.getView().getModel("localModel").setProperty("/VehicleDetVisible",true);
					                        sPath = "/VehicleDetailsSet('" + Pernr + "')";
					                        oModel.read(sPath, {
					                        	               	success: function (oData2, response2){
							                        	                          that.oLocalModel.setProperty("/Vehicleid",oData2.VehicleId);
							                        	                          that.oLocalModel.setProperty("/VehicleName",oData2.VehicleNo);
							                        	                          that.oLocalModel.setProperty("/VehicleNumber",oData2.VehicleText);
							                        	                          that.oLocalModel.setProperty("/Plant",oData2.VehiclePlant);
							                        	                          that.oLocalModel.setProperty("/Location",oData2.VehicleLoc);
							                        	                          that.getView().getModel("localModel").setProperty("/SumitRequestVisible",true);
					                        	               	},
		                                                     	                  
					                        	                error: function () {
								                            	sap.m.MessageToast.show("You are not eligible to create request");
							                                   	}
					                                         });
                                        
			                                                    },
						   		error: function () {
                                        that.getView().getModel("localModel").setProperty("/SumitRequestVisible",false);
								     	sap.m.MessageToast.show("No Data retreived");
							                      	}
							                      	
							                      	
		     					                      	

			});
		},

		   onSubmitRequest: function(oEvent){
		   	//Validation : If no vehicle assigned to the employee than send error message before submitting.
		   	var vehicle_assigned = this.getView().byId("idVehicleId").getText();
		   	if(vehicle_assigned === "")
		   	{
		   	 sap.m.MessageToast.show("Unable To Submit The Request As , No Vehicle Found For the Given Employee ID");	
		   	 return;
		   	}
		   	var flag           = "";
		 	var pernr          = this.getView().byId("idEmpid").getValue();
		 	var ename_en       = this.getView().byId("idNameEn").getText();
		 	var ename_ar       = this.getView().byId("idNameAr").getText();
		 	var pos_code       = this.getView().byId("idPositionCode").getText();
		 	var pos_en         = this.getView().byId("idPositionEn").getText();
		 	var pos_ar         = this.getView().byId("idPositionAr").getText();
		 	var dept_en        = this.getView().byId("idDepartmentEn").getText();
		 	var dept_ar        = this.getView().byId("idDepartmentAr").getText();
		 	var cocd           = this.getView().byId("idCocd").getText();
		 	var cocd_name      = this.getView().byId("idCompanyName").getText();
		 	var emp_subgrp     = this.getView().byId("idEmpSubGroup").getText();
		 	var subgroup_desc  = this.getView().byId("idEmpSubGroupDesc").getText();
		 	var iquama         = this.getView().byId("idIquama").getText();
		 	var dl             = this.getView().byId("idDl").getValue();
		 	var dl_id          = this.getView().byId("idDl");
		 	if ( dl === "")
		 	 {
		 	 	    dl_id.setValueState(ValueState.Error); // or just "Error"
                    dl_id.setValueStateText("Driving Liesence Is Required");
                    return;
		 	 }      
           else 
             {
             	   dl_id.setValueState(ValueState.None);
             }
		 	 
		 	var oModel = this.getView().getModel();
		 	var that   = this;
		 
		 	var fleet_req_entry = {
						            Pernr : pernr,
                                    NameEn : ename_en,
                                    NameAr : ename_ar,
                                    PositionId : pos_code,
                                    PositionTextEn : pos_en,
                                    PositionTextAr : pos_ar,
                                    NatioEn          : "",
                                    NatioAr          : "",
                                    DepartmentEn     : dept_en,
                                    DepartmentAr     : dept_ar,
                                    IdNoEn           : iquama ,
                                    IdNoAr           : "",
                                    Cocd             : cocd,
                                    CocdDesc         : cocd_name,
                                    Dl               : dl,
                                    EmpSubgroup      : emp_subgrp,
                                    EmpSubgroupDesc : subgroup_desc,
                                    ReturnHeaderToItemNav : [{ }]
				                    };
				                    
				 	oModel.create("/FleetReturnHeaderSet",
					              	fleet_req_entry, {
                                        	success: function(oData , response) {
													if (oData.Requestduplicate === 'X') {
									                    flag = "X";					
														sap.m.MessageToast.show("Duplicate Request being submitted.");
													}

													if (oData.Requesterror === 'X') {
														    flag = "X";	
															sap.m.MessageToast.show("Error while submitting request. Please Try again.");
													}

													if (flag !== 'X') {
													    that.oLocalModel2.setProperty("/Response",oData);
													    that.oLocalModel2.setProperty("/Type","Success");
													    that.oLocalModel2.setProperty("/Visible",true);
													    var RequestId = that.oLocalModel2.getProperty("/Response/RequestId");
													    var Text = "Service vehicle Return Request :"  +RequestId+ " has been generated successfully";
													    sap.m.MessageToast.show(Text);
													    that.oLocalModel2.setProperty("/Text",Text);
														that.getView().getModel("localModel").setProperty("/SumitRequestVisible",false);
							                       	}
							                                },
										    	error: function(oError) {
													 var error_msg =  jQuery.parseJSON(oError.responseText).error.message.value;
										    		 sap.m.MessageToast.show(error_msg);
										             return;
													}

					               	});                      	                   
				                    
		 	
		    }
		
	});
});