SELECT 
    xt.CUIIO       AS XML_CUIIO,
    xt.CUATM       AS XML_CUATM_4_CIFRE,
    REGEXP_REPLACE(xt.CAPITOL4_R42_C1, '\s+', ' ') AS CAPITOL4_R42_C1
FROM USER_BANCU.F_XML_FORMS f,
     XMLTABLE(
       '/dec/DataSet'
       PASSING XMLTYPE(f.XML)
       COLUMNS 
         CUIIO             VARCHAR2(20)    PATH 'Header/CUIIO',
         CUATM             VARCHAR2(20)    PATH 'Header/CUATM',
         CAPITOL4_R42_C1   VARCHAR2(4000)  PATH 'Data/CAPITOL4_R42_C1'
     ) xt
WHERE 
1=1 
AND 
     f.FORMID = 25209582;
