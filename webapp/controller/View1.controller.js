sap.ui.define(["sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/BindingMode",
    "sap/ui/core/message/Message",
    "sap/ui/core/library",
    "sap/m/MessageToast",
    "sap/ui/core/library"],
    function (e, t, o, s, i, a, r, l) {
        "use strict";
        return e.extend("ZGBC_FLEET_RETURN.ZGBC_FLEET_RETURN.controller.View1",
            {
                onInit: function () {
                    var e, t;
                    t = this.getView();
                    e = sap.ui.getCore().getMessageManager();
                    t.setModel(e.getMessageModel(), "message");
                    var o = { Vehicleid: "", VehicleName: "", VehicleNumber: "", Plant: "", Location: "", VehicleDetVisible: false, SumitRequestVisible: false }; this.oLocalModel = new sap.ui.model.json.JSONModel(o); t.setModel(this.oLocalModel, "localModel"); var s = { Response: [], Text: "", Type: "", Visible: false };
                    this.oLocalModel2 = new sap.ui.model.json.JSONModel(s);
                    t.setModel(this.oLocalModel2, "localModel2")
                },
                onSubmit: function (e) {
                    var t = e.getSource().getValue();
                    var o = this; var s = "/EmployeeDetailsSet('" + t + "')";
                    var i = this.getView().getModel(); i.read(s, {
                        success: function (e, a) {
                            var r = new sap.ui.model.json.JSONModel(e);
                            var l = o.getView().byId("IdEmpDetail");
                            l.setModel(r);
                            o.getView().getModel("localModel").setProperty("/VehicleDetVisible", true);
                            s = "/VehicleDetailsSet('" + t + "')"; i.read(s, {
                                success: function (e, t) {
                                    o.oLocalModel.setProperty("/Vehicleid", e.VehicleId);
                                    o.oLocalModel.setProperty("/VehicleName", e.VehicleNo);
                                    o.oLocalModel.setProperty("/VehicleNumber", e.VehicleText);
                                    o.oLocalModel.setProperty("/Plant", e.VehiclePlant);
                                    o.oLocalModel.setProperty("/Location", e.VehicleLoc);
                                    o.getView().getModel("localModel").setProperty("/SumitRequestVisible", true)
                                }, error: function () { sap.m.MessageToast.show("You are not eligible to create request") }
                            })
                        }, error: function () {
                            o.getView().getModel("localModel").setProperty("/SumitRequestVisible", false);
                            sap.m.MessageToast.show("No Data retreived")
                        }
                    })
                },
                onSubmitRequest: function (e) {
                    var t = this.getView().byId("idVehicleId").getText();
                    if (t === "") {
                        sap.m.MessageToast.show("Unable To Submit The Request As , No Vehicle Found For the Given Employee ID");
                        return
                    } var o = "";
                    var s = this.getView().byId("idEmpid").getValue();
                    var i = this.getView().byId("idNameEn").getText();
                    var r = this.getView().byId("idNameAr").getText();
                    var l = this.getView().byId("idPositionCode").getText();
                    var d = this.getView().byId("idPositionEn").getText();
                    var u = this.getView().byId("idPositionAr").getText();
                    var n = this.getView().byId("idDepartmentEn").getText();
                    var c = this.getView().byId("idDepartmentAr").getText();
                    var g = this.getView().byId("idCocd").getText();
                    var p = this.getView().byId("idCompanyName").getText();
                    var V = this.getView().byId("idEmpSubGroup").getText();
                    var h = this.getView().byId("idEmpSubGroupDesc").getText();
                    var m = this.getView().byId("idIquama").getText();
                    var M = this.getView().byId("idDl").getValue();
                    var b = this.getView().byId("idDl");

                    if (M === "") {
                        b.setValueState(a.Error);
                        b.setValueStateText("Driving Liesence Is Required");
                        return
                    } else { b.setValueState(a.None) }
                    var y = this.getView().getModel(); var v = this;
                    var T = { Pernr: s, NameEn: i, NameAr: r, PositionId: l, PositionTextEn: d, PositionTextAr: u, NatioEn: "", NatioAr: "", DepartmentEn: n, DepartmentAr: c, IdNoEn: m, IdNoAr: "", Cocd: g, CocdDesc: p, Dl: M, EmpSubgroup: V, EmpSubgroupDesc: h, ReturnHeaderToItemNav: [{}] };
                    y.create("/FleetReturnHeaderSet", T, {
                        success: function (e, t) {
                            if (e.Requestduplicate === "X") { o = "X"; sap.m.MessageToast.show("Duplicate Request being submitted.") }
                            if (e.Requesterror === "X") { o = "X"; sap.m.MessageToast.show("Error while submitting request. Please Try again.") } if (o !== "X") {
                                v.oLocalModel2.setProperty("/Response", e);
                                v.oLocalModel2.setProperty("/Type", "Success");
                                v.oLocalModel2.setProperty("/Visible", true);
                                var s = v.oLocalModel2.getProperty("/Response/RequestId");
                                var i = "Service vehicle Return Request :" + s + " has been generated successfully";
                                sap.m.MessageToast.show(i);
                                v.oLocalModel2.setProperty("/Text", i);
                                v.getView().getModel("localModel").setProperty("/SumitRequestVisible", false)
                            }
                        }, error: function (e) {
                            var t = jQuery.parseJSON(e.responseText).error.message.value;
                            sap.m.MessageToast.show(t); return
                        }
                    })
                }
            })
    });