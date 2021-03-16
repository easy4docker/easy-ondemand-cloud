# -- Add docker app ... <%=@serverName %> --

cd <%=@dockerSettingPath %>

docker build -f <%=@dockerFile %> -t <%=@siteImage %> .

docker container stop <%=@siteContainer %>

docker container rm <%=@siteContainer %>

echo "1" > <%=@shareFolder %>
echo "2" > <%=@shareFolder %>
echo "3" > <%=@shareFolder %>
echo "4" > <%=@shareFolder %>
echo "5" > <%=@shareFolder %>
echo "6" > <%=@shareFolder %>

docker run -d <%=@cmdPorts  %> -v "<%=@shareFolder %>":/var/_shareFolder -v "<%=@dockerCodePath%>":/var/_localApp -v "<%=@dockerDataPath%>":/var/_localAppData -v "<%=@dockerEnvPath%>":/var/_localAppEnv  --network network_easydocker --name <%=@siteContainer %>  <%=@siteImage %>
