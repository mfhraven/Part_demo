var MWYMenu = MWYMenu || {};

/*:
* @param NeedItem
* @desc is itemCmd needed In Menu
* YES - true    NO - false
* @type boolean
* @default true
*
* @param NeedSkill
* @desc is skillCmd needed In Menu
* YES - true    NO - false
* @type boolean
* @default true
*
* @param NeedEquip
* @desc is equipCmd needed In Menu
* YES - true    NO - false
* @type boolean
* @default true
*
* @param NeedStatus
* @desc is statusCmd needed In Menu
* YES - true    NO - false
* @type boolean
* @default true
*
* @param NeedFormat
* @desc is formatCmd needed In Menu
* YES - true    NO - false
* @type boolean
* @default true
*
* @param VisualRow
* @desc how many row can see in menu
* @type number
* @default 1
*/

MWYMenu.Parameters = PluginManager.parameters('MWYMenu');
MWYMenu.Params = MWYMenu.Params || {};

MWYMenu.Params.NeedItem = eval(String(MWYMenu.Parameters['NeedItem']));
MWYMenu.Params.NeedSkill = eval(String(MWYMenu.Parameters['NeedSkill']));
MWYMenu.Params.NeedEquip = eval(String(MWYMenu.Parameters['NeedEquip']));
MWYMenu.Params.NeedStatus = eval(String(MWYMenu.Parameters['NeedStatus']));
MWYMenu.Params.NeedFormat = eval(String(MWYMenu.Parameters['NeedFormat']));

MWYMenu.Params.VisualRow = Number(MWYMenu.Parameters['VisualRow']);


//=============================================================================
// Scene_Menu
//=============================================================================

Scene_Menu.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createCommandWindow();
    this.createStatusWindow();
}

Scene_Menu.prototype.createStatusWindow = function() {
    this._statusWindow = new Window_MenuStatus(0, this._commandWindow.height);
    this._statusWindow.reserveFaceImages();
    this.addWindow(this._statusWindow);
};

//=============================================================================
// Window_MenuCommand
//=============================================================================

Window_MenuCommand.prototype.addMainCommands = function() {
    var enabled = this.areMainCommandsEnabled();
    if (MWYMenu.Params.NeedItem) {
        this.addCommand(TextManager.item, 'item', enabled);
    }
    if (MWYMenu.Params.NeedSkill) {
        this.addCommand(TextManager.skill, 'skill', enabled);
    }
    if (MWYMenu.Params.NeedEquip) {
        this.addCommand(TextManager.equip, 'equip', enabled);
    }
    if (MWYMenu.Params.NeedStatus) {
        this.addCommand(TextManager.status, 'status', enabled);
    }
};

Window_MenuCommand.prototype.addFormationCommand = function() {
    if (MWYMenu.Params.NeedFormat) {
        var enabled = this.isFormationEnabled();
        this.addCommand(TextManager.formation, 'formation', enabled);
    }
};

Window_MenuCommand.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};

Window_MenuCommand.prototype.maxCols = function() {
    return 4;
};

Window_MenuCommand.prototype.numVisibleRows = function() {
    return MWYMenu.Params.VisualRow;
};

//=============================================================================
// Window_MenuStatus
//=============================================================================

Window_MenuStatus.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};

Window_MenuStatus.prototype.windowHeight = function() {
    var h1 = this.fittingHeight(MWYMenu.Params.VisualRow);
    //var h2 = this.fittingHeight(2);
    return Graphics.boxHeight - h1;
};

Window_MenuStatus.prototype.maxCols = function() {
    return 4;
};

Window_MenuStatus.prototype.numVisibleRows = function() {
    return 1;
};

Window_MenuStatus.prototype.drawItemImage = function(index) {
    //if (index == 1) return;
    var actor = $gameParty.members()[index];
    var rect = this.itemRectForText(index);
    var w = Math.min(rect.width, 144);
    var h = Math.min(rect.height, 144);
    var lineHeight = this.lineHeight();
    this.changePaintOpacity(actor.isBattleMember());
    //this.drawActorFace(actor, rect.x, rect.y + lineHeight * 2.5, w, h);
    this.drawFace(actor.faceName(), actor.faceIndex(), rect.x, rect.y + lineHeight * 1.5, w, h);
    this.drawFace(actor.faceName(), actor.faceIndex() + 4, rect.x, rect.y + lineHeight * 5.5, w, h);
    this.changePaintOpacity(true);
};

Window_MenuStatus.prototype.drawItemStatus = function(index) {
    var actor = $gameParty.members()[index];
    var rect = this.itemRectForText(index);
    var x = rect.x;
    var y = rect.y;
    var width = rect.width;
    var bottom = y + rect.height;
    var lineHeight = this.lineHeight();
    this.drawActorName(actor, x, y + lineHeight * 0, width);
    //this.drawActorLevel(actor, x, y + lineHeight * 1, width);
    //this.drawActorClass(actor, x, bottom - lineHeight * 4, width);
    this.drawActorHp(actor, x, y + lineHeight * 10, width);
    //this.drawActorMp(actor, x, bottom - lineHeight * 2, width);
    //this.drawActorIcons(actor, x, bottom - lineHeight * 1, width);
};