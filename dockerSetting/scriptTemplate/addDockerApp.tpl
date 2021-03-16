# -- Add docker app ... <%=@serverName %> --

cd <%=@dockerSettingPath %>

docker build -f <%=@dockerFile %> -t <%=@siteImage %> .

docker container stop <%=@siteContainer %>

docker container rm <%=@siteContainer %>


mkdir -p <%=@shareFolder %>/1
mkdir -p <%=@shareFolder %>/2
mkdir -p <%=@shareFolder %>/3
mkdir -p <%=@shareFolder %>/4
mkdir -p <%=@shareFolder %>/5
mkdir -p <%=@shareFolder %>/6


echo "1" > <%=@shareFolder %>/1/1.txt
echo "2" > <%=@shareFolder %>/2/2.txt
echo "3" > <%=@shareFolder %>/3/3.txt
echo "4" > <%=@shareFolder %>/4/4.txt
echo "5" > <%=@shareFolder %>/5/5.txt
echo "6" > <%=@shareFolder %>/6/6.txt

docker run -d <%=@cmdPorts  %> -v "<%=@shareFolder %>":/var/_sharedFolder -v "<%=@dockerCodePath%>":/var/_localApp -v "<%=@dockerDataPath%>":/var/_localAppData -v "<%=@dockerEnvPath%>":/var/_localAppEnv  --network network_easydocker --name <%=@siteContainer %>  <%=@siteImage %>
