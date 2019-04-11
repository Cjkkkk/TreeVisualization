 const AST = (function(){
    var id = 1
    var map = {}

    function ast(root){
        this.root = root
        this.leaf = []
        this.expand = false
    }

    ast.prototype.print = function(indent=''){
        indent += '\t'
        var content = this.leaf.map(elem=>{
            if(elem.leaf.length == 0) return indent + elem.root
            map[id] = elem
            id++
            var text;
            if(elem.expand) {
                text = `${indent}<button id=${id-1} onclick="onClick(this)">-</button> ${elem.print(indent)}`
            }
            else{
                text =`${indent}<button id=${id-1} onclick="onClick(this)">+</button>{ ${elem.root} }`
            }
            return text;
        }).join('\n');
        return `{\n${indent}${this.root}\n${content}\n${indent.slice(0,-1)}}`
    }
    function resetAstMap() {
        id = 1
    }
    function alterAstNodeExpandState(id) {
        map[id].expand = !map[id].expand
    }
    function printAst(astTree) {
        return astTree.print()
    }
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
    return {
        buildAst,
        printAst,
        alterAstNodeExpandState,
        resetAstMap
    }
}())