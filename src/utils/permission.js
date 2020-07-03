function permit(){
    var list = [
        permissions.INTERNET,
        permissions.ACCESS_COARSE_LOCATION,
        permissions.ACCESS_FINE_LOCATION,
        permissions.ACCESS_NETWORK_STATE,
        permissions.ACCESS_WIFI_STATE,
        permissions.CHANGE_WIFI_STATE,
        permissions.INTERNET,
        permissions.READ_PHONE_STATE,
        permissions.WRITE_EXTERNAL_STORAGE,
        permissions.ACCESS_LOCATION_EXTRA_COMMANDS,
        permissions.BLUETOOTH,
        permissions.BLUETOOTH_ADMIN,
        permissions.CAMERA,
        permissions.WRITE_EXTERNAL_STORAGE,
    ]
    var permissions = cordova.plugins.permissions
    permissions.checkPermission(list, function(s) {
        //hasPermission 验证是否成功
        if (!s.hasPermission) {
            //没有权限
            //app申请写入权限
            permissions.requestPermission(list, function(s) {
        if (s.hasPermission) {
            //申请成功
        }
        else {
            //申请失败
            this.$dialog.alert({
                message: "获取权限失败，请手动至系统打开相应权限"
              });
        }
        }, function(error) {
            this.$dialog.alert({
                message: "获取权限失败，请手动至系统打开相应权限"
              });
        });
        } else {
            //拥有权限
        }
        }, function(error) {
            this.$dialog.alert({
                message: "获取权限失败，请手动至系统打开相应权限"
              });
        })
}
export{
    permit
}