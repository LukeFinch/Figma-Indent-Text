import { dispatch, handleEvent } from './codeMessageHandler';
import { setCharacters, loadUniqueFonts } from '@figma-plugin/helpers'

figma.showUI(__html__);

// The following shows how messages from the UI code can be handled in the main code.
handleEvent('createNode', (indent) => {
	console.log(indent)
	const textNodes = figma.currentPage.selection.filter(node => node.type == "TEXT") as Array<TextNode>
	loadUniqueFonts(textNodes).then(
		res => {
			//console.log(res)
			textNodes.forEach(node => {
				if(node.characters.charCodeAt(0) != 8203){
					node.insertCharacters(0,String.fromCharCode(8203),"BEFORE")				
				}
				node.setRangeFillStyleId(0,1,'')
				node.setRangeFontSize(0,1,1)

				let tmp = []
				for(var i = 0; i < node.characters.length; i++){
					tmp.push(node.getRangeTextStyleId(i,i+1))
				}
				node.paragraphIndent = Number(indent)
				for(var i = 0; i < tmp.length; i++){
					node.setRangeTextStyleId(i,i+1,tmp[i])
				}
				})
		},
		rej => {
			figma.notify('Something went wrong')
		}
	)

});
