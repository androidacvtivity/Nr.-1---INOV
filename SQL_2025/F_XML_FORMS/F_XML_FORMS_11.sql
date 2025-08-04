SELECT 
    xt.CUIIO AS XML_CUIIO,
    x.XML_NODE_NAME,
    x.XML_NODE_VALUE
FROM USER_BANCU.F_XML_FORMS f,
     XMLTABLE(
       '/dec/DataSet'
       PASSING XMLTYPE(f.XML)
       COLUMNS 
         CUIIO   VARCHAR2(20) PATH 'Header/CUIIO',
         DATA    XMLTYPE      PATH 'Data'
     ) xt,
     XMLTABLE(
       '/*/*'   -- <Data>/* = toate elementele copil
       PASSING xt.DATA
       COLUMNS 
         XML_NODE_NAME  VARCHAR2(100)   PATH 'name()',
         XML_NODE_VALUE VARCHAR2(4000)  PATH 'normalize-space(text())'
     ) x
WHERE f.FORMID = 25209582;
