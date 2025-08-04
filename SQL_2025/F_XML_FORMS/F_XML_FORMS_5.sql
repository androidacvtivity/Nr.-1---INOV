
DELETE
FROM USER_BANCU.INOV_1;

SELECT *
FROM USER_BANCU.INOV_1;


--INSERT INTO USER_BANCU.INOV_1 
--(
--CUIIO,
--IDNO
--)


SELECT 
  
  h.CUIIO AS XML_CUIIO,
  x.XML_NODE_VALUE IDNO



FROM USER_BANCU.F_XML_FORMS_D f,
     XMLTABLE(
       '/dec/DataSet/Header'
       PASSING XMLTYPE(f.XML)
       COLUMNS 
         CUIIO VARCHAR2(20) PATH 'CUIIO',
         IDNO  VARCHAR2(20) PATH 'IDNO'
    --     ENT_NAME  VARCHAR2(20) PATH 'ENT_NAME'
         
        
         
     ) h,
     XMLTABLE(
       '//dec/DataSet/Data/*'
       PASSING XMLTYPE(f.XML)
       COLUMNS 
         XML_NODE_NAME  VARCHAR2(100) PATH 'name()',
         XML_NODE_VALUE VARCHAR2(4000) PATH 'text()'
     ) x
     
     WHERE 
    --  ID > 1000 -- AND ID <= 1000 
     --AND  
     f.FORMID IN (25209582)
     AND 
     x.XML_NODE_NAME IN ('CAPITOL4_R42_C1')