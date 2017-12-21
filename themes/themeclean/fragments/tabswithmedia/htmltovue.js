module.exports = {
    convert: function($, f) {
        //f.bindPath($)
    	f.wrap($, 'themeclean-components-block')
        f.bindAttribute($.parent(),'model','model')
        f.replace( $.find('img'), '<themeclean-components-media :model="model"></themeclean-components-media>')
        f.bindAttribute($.find('div').eq(3), 'style', "{flexBasis:`${model.mediawidth}%`}")
    	f.addIf($.find('h2').first(), 'model.showtitle == \'true\'')
        f.mapRichField($.find('h2').first(), "model.title")
        f.addIf($.find('h3').first(), 'model.showsubtitle == \'true\'')
        f.mapRichField($.find('h3').first(), "model.subtitle")
        
        f.addFor($.find('li.nav-item').first(), 'model.tabs')
        f.bindAttribute($.find('a').first(), 'href', '`#tab${_uid}${parseInt(i)+1}`')
    	f.bindAttribute($.find('a').first(), 'class', 'i == 0 ? \'nav-link active\' : \'nav-link\'')
    	f.bindAttribute($.find('a').first(), 'id', '`tab-control-${_uid}${parseInt(i)+1}`')
    	f.bindAttribute($.find('a').first(), 'aria-controls', '`tab${_uid}${parseInt(i)+1}`')
    	f.mapRichField($.find('a').first(), "item.title")
    	
    	f.addFor($.find('div.tab-pane').first(), 'model.tabs')
    	f.bindAttribute($.find('div.tab-pane').first(), 'id', '`tab${_uid}${parseInt(i)+1}`')
        f.bindAttribute($.find('div.tab-pane').first(), 'aria-labelledby', '`tablabel${_uid}${parseInt(i)+1}`')
        f.bindAttribute($.find('div.tab-pane').first(), 'class', 'i == 0 ? \'tab-pane fade show active\' : \'tab-pane fade\'')
        f.mapRichField($.find('div.text-center').first(), "item.text")
        f.addIf($.find('.perIsEditAndEmpty').first(), 'isEditAndEmpty')
    }
}