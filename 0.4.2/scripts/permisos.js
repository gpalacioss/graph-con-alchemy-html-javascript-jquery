
  const permiso = async() => {
        const response = await fetch('http://localhost:8080/usuariosAndPermisosGraph/Zaira Casimiro');
        var dataSource = await response.json();
        console.log(dataSource);

       var config = {
          dataSource,
          edgeTypes: {"edgeType":["MEMBER_OF", "TRABAJA_EN", "CHILD_OF", "ALLOW"]},
          nodeTypes: {"nodeType":["usuario", "compania", "grupo", "permiso", "cuenta", "rol", "perfil"]},
          directedEdges:true,
          forceLocked: false,
          nodeCaption: 'name',
          edgeCaption: 'edgeType',
          nodeCaptionsOnByDefault: true,
          nodeStyle: {
              "usuario": {
                "color"      : "#F6F",
                "radius"     : 20,
                "borderWidth": 8
              },
              "compania": {
                "color"      : "#f2eb29",
                "radius"     : 20,
                "borderWidth": 8
              },
              "grupo": {
                "color"      : "#f7a204",
                "radius"     : 20,
                "borderWidth": 8
              },
              "permiso": {
                "color"      : "#f7a204",
                "radius"     : 20,
                "borderWidth": 8
              },
              "cuenta": {
                "color"      : "#7a49ed",
                "radius"     : 20,
                "borderWidth": 8
              },
              "rol": {
                "color"      : "#28f416",
                "radius"     : 20,
                "borderWidth": 8
              },
              "perfil": {
                "color"      : "#f7043d",
                "radius"     : 20,
                "borderWidth": 8
              }},
              edgeStyle: {
              "MEMBER_OF": {
                "width": 5,
                "color": "#F6F"
              },
              "TRABAJA_EN": {
                "width": 8,
                "color": "#f2eb29"
              },
              "CHILD_OF": {
                "width": 8,
                "color": "#f2eb29"
              },
              "ALLOW": {
                "width": 8,
                "color": "#f7a204"
              }
            },
            //dataSource: 'http://127.0.0.1:8887/usuarioAndPermisosGraph.json'
            };

          var alchemy = new Alchemy(config);
    
    click();
    }