SELECT 
    h.CUIIO AS XML_CUIIO,
    REGEXP_REPLACE(
        x.XML_NODE_VALUE,
        '\s+',
        ' '
    ) AS CAPITOL4_R42_C1
FROM USER_BANCU.F_XML_FORMS f,
     XMLTABLE(
       '/dec/DataSet/Header'
       PASSING XMLTYPE(f.XML)
       COLUMNS 
         CUIIO VARCHAR2(20) PATH 'CUIIO',
         IDNO  VARCHAR2(20) PATH 'IDNO'
     ) h,
     XMLTABLE(
       '//dec/DataSet/Data/*'
       PASSING XMLTYPE(f.XML)
       COLUMNS 
         XML_NODE_NAME  VARCHAR2(100)  PATH 'name()',
         XML_NODE_VALUE VARCHAR2(4000) PATH 'text()'
     ) x
WHERE 
     f.FORMID = 25209582
     AND x.XML_NODE_NAME = 'CAPITOL4_R42_C1';
