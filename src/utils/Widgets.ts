import Search from '@arcgis/core/widgets/Search';

export const initializeWidgets=(view:any)=> {
    if (!view) return;
    
      
  //Geo-coding
const searchWidget = new Search({
  view: view,
  popupEnabled:false,
});
view.ui.add(searchWidget, {position: "top-left",index: 2});
  return ;
}
