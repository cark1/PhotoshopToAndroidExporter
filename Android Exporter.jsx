/*!
 * Android Exporter for Photoshop
 * =============================
 *
 * Version: 0.1
 * Author: Simone Carcone
 * Site: simonecarcone.com
 * Licensed under the MIT license
 */


main();


function main(){
	
	var box = new Window("dialog", "Android Exporter");  
  
  	//settings panel
	box.settingsPanel = box.add("panel", undefined, "Settings");
	
	box.settingsPanel.nameGroup = box.settingsPanel.add("group", undefined);  
	box.settingsPanel.nameGroup.orientation="row";  
	box.settingsPanel.nameGroup.nameLabel = box.settingsPanel.nameGroup.add("statictext", [25,40,120,60], "name");  
	box.settingsPanel.nameGroup.nameInput = box.settingsPanel.nameGroup.add("edittext",  [25,40,120,60], undefined); 
	
	box.settingsPanel.widthGroup = box.settingsPanel.add("group", undefined);  
	box.settingsPanel.widthGroup.orientation="row";  
	box.settingsPanel.widthGroup.widthLabel = box.settingsPanel.widthGroup.add("statictext", [25,40,120,60], "xxhdpi width");  
	box.settingsPanel.widthGroup.widthInput = box.settingsPanel.widthGroup.add("edittext",  [25,40,120,60], undefined);    
  	
	//buttonGroup
	box.buttonGroup = box.add("group", undefined);  
	box.buttonGroup.orientation="row";  
	box.buttonGroup.saveButton = box.buttonGroup.add("button",undefined, "Export", {name:"Export"}); 
	box.buttonGroup.closeButton = box.buttonGroup.add("button",undefined, "Cancel", {name:"Cancel"});  
  
	box.buttonGroup.saveButton.onClick = function(){  
		var close = startExport(box.settingsPanel.nameGroup.nameInput.text, box.settingsPanel.widthGroup.widthInput.text);
		if(close){
			box.close();
		}
	}
	
	box.buttonGroup.closeButton.onClick = function(){  
		box.close();  
	} 
	
	box.show();
    
}//main


function startExport(_name, _width){
	
	if(_name.length == 0){
		alert("Insert the name");
		return false;
	}
	
	_width = parseInt(_width);
	
	if(isNaN(_width)){
		alert("Insert the xxhdpi width");
		return false;
	}
	
	var xxhdpiWidth = _width;
	var xhdpiWidth = xxhdpiWidth/3*2;
	var hdpiWidth = xxhdpiWidth/2;
	var mdpiWidth = xhdpiWidth/2;
	
	var path = app.activeDocument.path;
	var name = _name;
	
	var mainFolder = Folder(path+"/"+name);
	var xxhdpiFolder = Folder(path+"/"+name+"/mipmap-xxhdpi");
	var xhdpiFolder = Folder(path+"/"+name+"/mipmap-xhdpi");
	var hdpiFolder = Folder(path+"/"+name+"/mipmap-hdpi");
	var mdpiFolder = Folder(path+"/"+name+"/mipmap-mdpi");
		
	mainFolder.create();
	xxhdpiFolder.create();
	xhdpiFolder.create();
	hdpiFolder.create();
	mdpiFolder.create();
	
	var xxhdpiFile = File(xxhdpiFolder+"/"+name+".png");
	var xhdpiFile = File(xhdpiFolder+"/"+name+".png");
	var hdpiFile = File(hdpiFolder+"/"+name+".png");
	var mdpiFile = File(mdpiFolder+"/"+name+".png");
	
	var pngSaveOptions = new PNGSaveOptions()
	pngSaveOptions.compression = 9;
	pngSaveOptions.interlaced=false;
	
	var doc = app.activeDocument.duplicate("tmp"); 
	doc.resizeImage(xxhdpiWidth);
	doc.saveAs(xxhdpiFile,pngSaveOptions,true,Extension.LOWERCASE);
	
	doc.resizeImage(xhdpiWidth);
	doc.saveAs(xhdpiFile,pngSaveOptions,true,Extension.LOWERCASE);
	
	doc.resizeImage(hdpiWidth);
	doc.saveAs(hdpiFile,pngSaveOptions,true,Extension.LOWERCASE);
	
	doc.resizeImage(mdpiWidth);
	doc.saveAs(mdpiFile,pngSaveOptions,true,Extension.LOWERCASE);
	
	doc.close(SaveOptions.DONOTSAVECHANGES);
	
	return true;
	
}//startExport
