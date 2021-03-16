# -- Add docker app ... <%=@serverName %> --

cd <%=@dockerSettingPath %>

docker build -f <%=@dockerFile %> -t <%=@siteImage %> .

docker container stop <%=@siteContainer %>

docker container rm <%=@siteContainer %>

echo "1" > <%=@shareFolder %>/1.txt
echo "2" > <%=@shareFolder %>/2.txt
echo "3" > <%=@shareFolder %>/3.txt
echo "4" > <%=@shareFolder %>/4.txt
echo "5" > <%=@shareFolder %>/5.txt
echo "6" > <%=@shareFolder %>/6.txt

docker run -d <%=@cmdPorts  %> -v "<%=@shareFolder %>":/var/_shareFolder -v "<%=@dockerCodePath%>":/var/_localApp -v "<%=@dockerDataPath%>":/var/_localAppData -v "<%=@dockerEnvPath%>":/var/_localAppEnv  --network network_easydocker --name <%=@siteContainer %>  <%=@siteImage %>
