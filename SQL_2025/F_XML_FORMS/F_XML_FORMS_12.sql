WITH extracted AS (
    SELECT 
        xt.CUIIO AS XML_CUIIO,
        REGEXP_REPLACE(x.XML_NODE_NAME, '_C[0-9]+$', '') AS COL1,  -- prefix fara _C1/C2
        REGEXP_SUBSTR(x.XML_NODE_NAME, '_C[0-9]+$') AS SUFFIX,     -- _C1 sau _C2
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
    COL1,
    XML_CUIIO AS COL2,
    MAX(CASE WHEN SUFFIX = '_C1' THEN XML_NODE_VALUE END) AS COL3,
    MAX(CASE WHEN SUFFIX = '_C2' THEN XML_NODE_VALUE END) AS COL4,
    MAX(CASE WHEN SUFFIX = '_C3' THEN XML_NODE_VALUE END) AS COL5
FROM extracted
GROUP BY COL1, XML_CUIIO
ORDER BY COL1;
