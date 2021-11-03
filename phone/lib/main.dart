import 'dart:async';
import 'dart:convert';


import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;


void main() => runApp(const MyApp());

class MyApp extends StatefulWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  late Future<Node> futureNode;
  @override
  void initState() {
    super.initState();
    futureNode = getData();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Fetch Data Example',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Fetch Data Example'),
        ),
        body: Center(
          child: FutureBuilder<Node>(
            future: futureNode,
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                return Text(snapshot.data!.ip);
              } else if (snapshot.hasError) {
                return Text('${snapshot.error}');
              }

              // By default, show a loading spinner.
              return const CircularProgressIndicator();
            },
          ),
        ),
      ),
    );
  }
}


Future<Node> getData() async {
  final http.Response response = await http.get(Uri.parse('http://3.140.222.218:3000/allNodes/'));
  print(response.body);
  var parse = jsonDecode(response.body);
  print(parse);
  return Node.fromJson(parse);
}

Future<Node> getNodeData() async {
  final http.Response response = await http.get(Uri.parse('http://3.140.222.218:3000/1'));
  print(response.body);
  var parse = jsonDecode(response.body);
  print(parse);
  return Node.fromJson(parse);
}

class Node{
  int id;
  String ip;
  int isAlive;

  Node({Key? key, required this.id, required this.ip, required this.isAlive});

  factory Node.fromJson(dynamic json){
    print(json['id'].runtimeType);
    return Node(
      id: json['id'],
      ip: json['ip'],
      isAlive: json['is_alive']
    );
  }

}

