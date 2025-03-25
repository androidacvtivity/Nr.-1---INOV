--SELECT
--  :pPERIOADA AS PERIOADA,
--  :pFORM AS FORM,
--  :pFORM_VERS AS FORM_VERS,
--  :pID_MDTABLE AS ID_MDTABLE,
--  :pCOD_CUATM AS COD_CUATM,
--         
--  '0' AS NR_SECTIE,
--  '0' AS NUME_SECTIE,
--  '0' AS NR_SECTIE1,
--  '0' AS NUME_SECTIE1,
--  '0' AS NR_SECTIE2,
--  '0' AS NUME_SECTIE2,
--   6  AS NR_ROW,
--   6  AS ORDINE,
--  '00' AS DECIMAL_POS,
--  'intreprinderi inovatoare doar de procese'
--  AS NUME_ROW,
--  SUM(COL1) AS COL1,
--  NULL AS COL2
--   
--FROM
--(

SELECT
  D.CUIIO,
  COUNT(DISTINCT D.CUIIO) AS COL1
  
  FROM 
  CIS2.VW_DATA_ALL D  
  
WHERE
  D.PERIOADA IN (:pPERIOADA) AND 
  D.FORM_VERS = :pFORM_VERS     AND   
  D.FORM= :pFORM     AND    
  (:pID_MDTABLE=:pID_MDTABLE) AND
  D.CUATM_FULL LIKE '%'||:pCOD_CUATM||';%' AND 
  D.FORM IN (48)  

  
GROUP BY  
D.CUIIO

HAVING
 (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND IN ('1047.8.1.1') AND D.COL1=1 THEN D.COL1 ELSE NULL END))+
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND IN ('1047.8.1.2') AND D.COL1=1 THEN D.COL1 ELSE NULL END))+
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND IN ('1047.8.1.3') AND D.COL1=1 THEN D.COL1 ELSE NULL END))+
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND IN ('1047.8.1.4') AND D.COL1=1 THEN D.COL1 ELSE NULL END))+

  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND IN ('1046.7.1.1') AND D.COL1=1 THEN D.COL1 ELSE NULL END))+
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND IN ('1046.7.1.2') AND D.COL1=1 THEN D.COL1 ELSE NULL END))+
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND IN ('1046.7.1.3') AND D.COL1=1 THEN D.COL1 ELSE NULL END))+
  
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND IN ('1041.2.1.1') AND D.COL1=1 THEN D.COL1 ELSE NULL END))+
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND IN ('1041.2.1.2') AND D.COL1=1 THEN D.COL1 ELSE NULL END)))= 0 AND
  
  (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND IN ('1042.3.1.1') AND D.COL1=1 THEN D.COL1 ELSE NULL END))+
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND IN ('1042.3.1.2') AND D.COL1=1 THEN D.COL1 ELSE NULL END))+
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND IN ('1042.3.1.3') AND D.COL1=1 THEN D.COL1 ELSE NULL END)))>=1


---)