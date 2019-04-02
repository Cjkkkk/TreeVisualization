 const AST = (function(){
    // format ( / ( + 1 3 ) 5 )
    
     // ast.prototype.print = function(indent=''){
    //     indent += '\t'
    //     if(this.leaf.length == 0) return this.root;
    //     var content = this.leaf.map(elem=>indent+elem.print(indent)).join('\n');
    //     return `{\n${indent}${this.root}\n${content}\n${indent.slice(0,-1)}}`
    // }
    const AST = {
        buildAst,
        id: 1,
        map: {}
    }

    function ast(root){
        this.root = root
        this.leaf = []
        this.expand = false
    }

    ast.prototype.print = function(indent=''){
        indent += '\t'
        var content = this.leaf.map(elem=>{
            if(elem.leaf.length == 0) return indent + elem.root
            AST.map[AST.id] = elem
            AST.id++
            var text;
            if(elem.expand) {
                text = `${indent}<button id=${AST.id-1} onclick="onClick(this)">-</button> ${elem.print(indent)}`
            }
            else{
                text =`${indent}<button id=${AST.id-1} onclick="onClick(this)">+</button>{ ${elem.root} }`
            }
            return text;
        }).join('\n');
        return `{\n${indent}${this.root}\n${content}\n${indent.slice(0,-1)}}`
    }

    // uncessary
    function buildAst(tokens, position={current:0}){
        if(tokens[position.current]!= '(') console.log("error occurred!");
        position.current ++;
        var node = new ast(tokens[position.current]); // root
        position.current++;
        while(tokens[position.current] != ')'){
            if(tokens[position.current] == '(') {
                node.leaf.push(buildAst(tokens, position))
            }else {
                node.leaf.push(new ast(tokens[position.current]))
            }
            position.current ++;
        }
        return node
    }
    return AST
}())