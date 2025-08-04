WITH extracted AS (
    SELECT 
        xt.CUIIO AS CUIIO,
        REGEXP_SUBSTR(x.XML_NODE_NAME, '^(CAPITOL[0-9]+)') AS CAPITOL,
        REGEXP_SUBSTR(x.XML_NODE_NAME, '(R[0-9]+)') AS RAND,
        REGEXP_SUBSTR(x.XML_NODE_NAME, '_C[0-9]+$') AS SUFFIX,
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
           '/*/*'
           PASSING xt.DATA
           COLUMNS 
             XML_NODE_NAME  VARCHAR2(100)   PATH 'name()',
             XML_NODE_VALUE VARCHAR2(4000)  PATH 'normalize-space(text())'
         ) x
    WHERE f.FORMID = 25209582
)
SELECT 
    CAPITOL,
    RAND,
    CUIIO,
    MAX(CASE WHEN SUFFIX = '_C1' THEN XML_NODE_VALUE END) AS C1,
    MAX(CASE WHEN SUFFIX = '_C2' THEN XML_NODE_VALUE END) AS C2,
    MAX(CASE WHEN SUFFIX = '_C3' THEN XML_NODE_VALUE END) AS C3
FROM extracted
GROUP BY CAPITOL, RAND, CUIIO
ORDER BY CAPITOL, RAND;
