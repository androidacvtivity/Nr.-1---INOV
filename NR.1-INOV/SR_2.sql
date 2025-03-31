SELECT 
CASE 
     WHEN CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.1.%') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2) ELSE 0 END))<2
     THEN 'Completati Cap.1 Rindurile 1.1'
     
     WHEN 
         (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND 
          CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND||'.'||D.COL1 IN ('1.1.1.1','1.1.2.1') THEN 1 ELSE 0 END))>=1 AND
          CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.2%') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2) ELSE 0 END))<2
         )             
     THEN 'Completati Cap.1 Rindurile 1.2'      
     
     -----------------CONTR NOI 26.05.25
      WHEN 
        (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND 
         CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.1.%') THEN CIS2.NVAL(D.COL1) ELSE 0 END))>=1 AND
         CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.2%') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=0
         )             
     THEN 'Completati Cap.1 Rindurile 1.2.1 sau 1.2.2  "DA"'  
     
     ----------------CONTROL NOU 29.02.25
     
     WHEN CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.2.1') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=1 AND
          CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.3.1') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=0     
     THEN 'Completati Cap.1 Rindurile 1.3.1 - "suma"'  
     
     WHEN CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.2.2') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=1 AND
          CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.3.2') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=0 
     THEN 'Completati Cap.1 Rindurile 1.3.2 - "suma"' 
  
     WHEN CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.2.1') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=0 AND
          CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.3.1') THEN CIS2.NVAL(D.COL1) ELSE 0 END))<>0 
     THEN 'Completati Cap.1 Rindurile 1.2.1 "DA"' 
  
     WHEN CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.2.2') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=0 AND
          CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.3.2') THEN CIS2.NVAL(D.COL1) ELSE 0 END))<>0 
     THEN 'Completati Cap.1 Rindurile 1.2.2 "DA"' 
     ----------------
     
     WHEN 
         (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND 
          CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND||'.'||D.COL1 IN ('1.1.1.1','1.1.2.1') THEN 1 ELSE 0 END))>=1 AND
          CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.3%') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=0
         )             
     THEN 'Completati Cap.1 Rindurile 1.3'      
           
     WHEN 
         (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND 
          CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND||'.'||D.COL1 IN ('1.1.1.1','1.1.2.1') THEN 1 ELSE 0 END))>=1 AND
          CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.4%') THEN D.COL1 ELSE 0 END))=0
          )             
     THEN 'Completati Cap.1 Rindurile 1.4'      
   
     WHEN CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.5.%') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2) ELSE 0 END))<7
     THEN 'Completati Cap.1 Rindurile 1.5'
     
     WHEN  
      CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND 
      CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.5.%') THEN CIS2.NVAL(D.COL2) ELSE 0 END))<7 AND
      CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.6.%') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=0
     THEN 'Completati Cap.1 Rindurile 1.6'
     
     WHEN CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.7.%') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2) ELSE 0 END))<5 
     THEN 'Completati Cap.1 Rindurile 1.7' 
              
     
     ---CONTROL NOU
     
    ---------1
    
     WHEN CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.7.1') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=1 AND
          CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.8.1') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=0     
     THEN 'Completati Cap.1 Rindurile 1.8.1 - "suma"' 
     
     WHEN CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.7.4') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=1 AND
          CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.8.2') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=0 
     THEN 'Completati Cap.1 Rindurile 1.8.2 - "suma"' 
  
     WHEN CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.7.4') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=0 AND
          CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.8.2') THEN CIS2.NVAL(D.COL1) ELSE 0 END))<>0 
     THEN 'Completati Cap.1 Rindurile 1.7.4 "DA"' 
  
     WHEN CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.7.1') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=0 AND
          CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.8.1') THEN CIS2.NVAL(D.COL1) ELSE 0 END))<>0 
     THEN 'Completati Cap.1 Rindurile 1.7.1 "DA"' 
  

     WHEN 
    (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.1.%') THEN CIS2.NVAL(D.COL1) ELSE 0 END))>=1 OR
     CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.5.%') THEN CIS2.NVAL(D.COL1) ELSE 0 END))>=1 )AND
     CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.7.%') THEN CIS2.NVAL(D.COL1) ELSE 0 END))>=1 AND
     CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.9.%') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=0
     THEN 'Completati Cap.1 Rindurile 1.9'
  
    ---------2  
     WHEN 
     CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.1.%') THEN CIS2.NVAL(D.COL2) ELSE 0 END))=2 AND
     CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.5.%') THEN CIS2.NVAL(D.COL2) ELSE 0 END))=7 AND
     CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.7.%') THEN CIS2.NVAL(D.COL2) ELSE 0 END))=5 AND
     CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.10.%') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=0      
     THEN 'Completati Cap.1 Rindurile 1.10' 
     
     ------------------
   
     WHEN 
     CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.11.%') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2) ELSE 0 END))=0 AND
     CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND 
      IN ('1.1.1','1.1.2','1.5.1','1.5.2','1.5.3','1.5.4','1.5.5','1.5.6','1.5.7','1.7.1','1.7.2','1.7.3','1.7.4','1.7.5','1.7.6','1.7.7') THEN CIS2.NVAL(D.COL1) ELSE 0 END))>=1 
 
     THEN 'Completati Cap.1 Rindurile 1.11'
   
     ---------------------------------- 
     
--       WHEN 
--    (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND IN ('1.11.1','1.11.2') THEN CIS2.NVAL(D.COL2) ELSE 0 END))<>2 AND 
--     CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.12.%') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2)+CIS2.NVAL(D.COL3) ELSE 0 END))<1)
--     THEN 'Completati Cap.1 Rindurile 1.12'     
--   
    WHEN 
 (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND 
 (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND IN ('1.11.1','1.11.2') THEN CIS2.NVAL(D.COL2) ELSE 0 END))<>2 AND
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.10%') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=0) AND
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.12.%') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2)+CIS2.NVAL(D.COL3) ELSE 0 END))<1
  ) 
 THEN 'Completati Cap.1 Rindurile 1.12'  



--      WHEN 
--    (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND IN ('1.11.1','1.11.2') THEN CIS2.NVAL(D.COL2) ELSE 0 END))<>2 AND 
--     CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.12.2') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2)+CIS2.NVAL(D.COL3) ELSE 0 END))=0)
--     THEN 'Completati Cap.1 Rindurile 1.12.2'     
--     
--     WHEN 
--     (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND IN ('1.11.1','1.11.2') THEN CIS2.NVAL(D.COL2) ELSE 0 END))<>2 AND 
--     CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.12.3') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2)+CIS2.NVAL(D.COL3) ELSE 0 END))=0)
--     THEN 'Completati Cap.1 Rindurile 1.12.3'
--     
--     WHEN 
--    (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND IN ('1.11.1','1.11.2') THEN CIS2.NVAL(D.COL2) ELSE 0 END))<>2 AND 
--     CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.12.4') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2)+CIS2.NVAL(D.COL3) ELSE 0 END))=0)
--     THEN 'Completati Cap.1 Rindurile 1.12.4'
--     
--     WHEN    
--     (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND IN ('1.11.1','1.11.2') THEN CIS2.NVAL(D.COL2) ELSE 0 END))<>2 AND 
--     CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.12.5') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2)+CIS2.NVAL(D.COL3) ELSE 0 END))=0)
--     THEN 'Completati Cap.1 Rindurile 1.12.5'
--     
--     WHEN    
--     (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND IN ('1.11.1','1.11.2') THEN CIS2.NVAL(D.COL2) ELSE 0 END))<>2 AND 
--     CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.12.6') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2)+CIS2.NVAL(D.COL3) ELSE 0 END))=0)
--     THEN 'Completati Cap.1 Rindurile 1.12.6'
--     
--     WHEN    
--     (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND IN ('1.11.1','1.11.2') THEN CIS2.NVAL(D.COL2) ELSE 0 END))<>2 AND 
--      CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.12.7') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2)+CIS2.NVAL(D.COL3) ELSE 0 END))=0)
--     THEN 'Completati Cap.1 Rindurile 1.12.7'
--      
--     WHEN     
--     (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND IN ('1.11.1','1.11.2') THEN CIS2.NVAL(D.COL2) ELSE 0 END))<>2 AND 
--      CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.12.8') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2)+CIS2.NVAL(D.COL3) ELSE 0 END))=0)
--     THEN 'Completati Cap.1 Rindurile 1.12.8'
--    
--     WHEN     
--     (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND IN ('1.11.1','1.11.2') THEN CIS2.NVAL(D.COL2) ELSE 0 END))<>2 AND 
--      CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.12.9') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2)+CIS2.NVAL(D.COL3) ELSE 0 END))=0)
--     THEN 'Completati Cap.1 Rindurile 1.12.9'
--     
     
     -----------------CONTR NOU 28.02.25 var 1
     WHEN 
     CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('2.1.%') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2)+CIS2.NVAL(D.COL3)+CIS2.NVAL(D.COL4)+CIS2.NVAL(D.COL5) ELSE 0 END))<4 AND
    (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.1.%') THEN CIS2.NVAL(D.COL2) ELSE 0 END))=2 AND
     CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.5.%') THEN CIS2.NVAL(D.COL2) ELSE 0 END))=7 AND
     CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.7.%') THEN CIS2.NVAL(D.COL2) ELSE 0 END))=5 AND
     CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.10.%') THEN CIS2.NVAL(D.COL1) ELSE 0 END))>=1 )   
     
     THEN 'Completati Cap.2.1 Rindurile 2.1'
     
     ----var 2
     WHEN     
     (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1'  THEN 1 ELSE 0 END))>0 AND 
      CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('2.1.%') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2)+CIS2.NVAL(D.COL3)+CIS2.NVAL(D.COL4)+CIS2.NVAL(D.COL5) ELSE 0 END))<4 
     )THEN 'Completati Cap.2.1 Rindurile 2.1'
     
     
      
     WHEN CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('2.2.%') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2)+CIS2.NVAL(D.COL3)+CIS2.NVAL(D.COL4) ELSE 0 END))<8
     THEN 'Completati Cap.2.2 Rindurile 2.2' 
     
     WHEN CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('3.1.%') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2)+CIS2.NVAL(D.COL3)ELSE 0 END))<12
     THEN 'Completati Cap.3 Rindurile 3.1' 
     
     WHEN  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND IN ('4.1') THEN 1 ELSE 0 END))=0 
     THEN 'Completati Cap.4 Rindurile 4.1'
        
     ELSE 'Completati Cap.4 Rindurile 4.2'
   
          
END  AS REZULTAT
 
 
FROM
  CIS2.VW_DATA_ALL_TEMP D

WHERE
  (D.PERIOADA=:PERIOADA          ) AND
  (D.CUIIO=:CUIIO                ) AND
  (D.CUIIO_VERS=:CUIIO_VERS     OR :CUIIO_VERS = -1) AND
  (D.FORM = :FORM               ) AND
  (D.FORM_VERS=:FORM_VERS  OR :FORM_VERS=-1) AND
  (D.CAPITOL=:CAPITOL           OR :CAPITOL = -1) AND
  (D.CAPITOL_VERS=:CAPITOL_VERS OR :CAPITOL_VERS = -1) AND
  (D.ID_MD=:ID_MD               OR :ID_MD = -1)AND
  
   D.FORM IN(48) 

HAVING
 
 (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND 
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.1.%') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2) ELSE 0 END))<2
  )
   OR
   
  (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND 
   CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND||'.'||D.COL1 IN ('1.1.1.1','1.1.2.1') THEN 1 ELSE 0 END))>=1 AND
   CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.2%') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2) ELSE 0 END))<2
    )
    OR   
   (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND 
   CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND||'.'||D.COL1 IN ('1.1.1.1','1.1.2.1') THEN 1 ELSE 0 END))>=1 AND
   CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.3%') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=0
   ) 
   OR

-------------------------    
  (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND 
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND||'.'||D.COL1 IN ('1.1.1.1','1.1.2.1') THEN 1 ELSE 0 END))>=1 AND
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.4%') THEN D.COL1 ELSE 0 END))=0
  )
  
-------------------------   
  OR
  
  (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND 
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.5.%') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2) ELSE 0 END))<7
  ) 
  
  OR  
    
  (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND 
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.5.%') THEN CIS2.NVAL(D.COL2) ELSE 0 END))<7 AND
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.6.%') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=0
  ) 
  
  OR
  
  
  (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND 
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.7.%') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2) ELSE 0 END))<5
  ) 
  
  
  
  --------------CONTROL NOU
  
--   
--     WHEN CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.2.1') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=1 AND
--          CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.2.1') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=0     
--     THEN 'Completati Cap.1 Rindurile 1.3.1 - "suma"' 
--     
--     WHEN CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.2.2') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=1 AND
--          CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.3.2') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=0 
--     THEN 'Completati Cap.1 Rindurile 1.3.2 - "suma"' 
       
        
   OR  
  
  (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND 
   CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.2.1') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=1 AND
   CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.3.1') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=0 
  ) 
  
   OR  
  
  (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND 
   CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.2.2') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=1 AND
   CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.3.2') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=0 
  ) 
     ----------------

  
  
-- 1    WHEN CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.7.1') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=1 
--     THEN 'Completati Cap.1 Rindurile 1.8.1' 
--     
     
   OR  
  
  (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND 
   CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.7.1') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=1 AND
   CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.8.1') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=0 
  ) 
  
   OR  
  
  (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND 
   CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.7.4') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=1 AND
   CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.8.2') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=0 
  ) 
    
  
--   WHEN 
--     CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.1.%') THEN CIS2.NVAL(D.COL2) ELSE 0 END))=25 AND
--     CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.5.%') THEN CIS2.NVAL(D.COL2) ELSE 0 END))=7 AND
--     CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.7.%') THEN CIS2.NVAL(D.COL2) ELSE 0 END))=5      
--     THEN 'Completati Cap.1 Rindurile 1.10' 
--     
   
     OR  
  
  (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.1.%') THEN CIS2.NVAL(D.COL2) ELSE 0 END))=5 AND 
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.5.%') THEN CIS2.NVAL(D.COL2) ELSE 0 END))=7 AND
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.7.%') THEN CIS2.NVAL(D.COL2) ELSE 0 END))=5 AND
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.10.%') THEN CIS2.NVAL(D.COL2) ELSE 0 END))=0    
  ) 
 
 -----------------CONTR NOI 26.05.25
--      WHEN 
--        (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND 
--         CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.1.%') THEN CIS2.NVAL(D.COL1) ELSE 0 END))>=1 AND
--         CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.2%') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=0
--         )             
--     THEN 'Completati Cap.1 Rindurile 1.2.1 sau 1.2.2  "DA"'  
     
       OR  
  
  (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.1.%') THEN CIS2.NVAL(D.COL1) ELSE 0 END))>=1 AND 
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.2.%') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=0  
  ) 
  
  ---------------------27.02.25
--   WHEN CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.7.4') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=0 AND
--        CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.8.2') THEN CIS2.NVAL(D.COL1) ELSE 0 END))<>0 
--   THEN 'Completati Cap.1 Rindurile 1.7.4 "DA"' 
--     
  OR  
  
  (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND
   CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.7.4') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=0 AND
   CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.8.2') THEN CIS2.NVAL(D.COL1) ELSE 0 END))<>0 
  ) 
    
--  
--     WHEN CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.7.1') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=0 AND
--          CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.8.1') THEN CIS2.NVAL(D.COL1) ELSE 0 END))<>0 
--     THEN 'Completati Cap.1 Rindurile 1.7.1 "DA"' 
--  

  OR  
  
  (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND
   CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.7.1') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=0 AND
   CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.8.1') THEN CIS2.NVAL(D.COL1) ELSE 0 END))<>0 
  ) 
  
--    WHEN CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.9.%') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=0
--    THEN 'Completati Cap.1 Rindurile 1.9'
    
   OR
  
  (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND
 ( CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.1.%') THEN CIS2.NVAL(D.COL1) ELSE 0 END))>=1 OR 
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.5.%') THEN CIS2.NVAL(D.COL1) ELSE 0 END))>=1 )AND
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.7.%') THEN CIS2.NVAL(D.COL1) ELSE 0 END))>=1 AND
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.9.%') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=0
   ) 
   
  ------------------------
   OR
  
  (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND 
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND 
  IN ('1.1.1','1.1.2','1.5.1','1.5.2','1.5.3','1.5.4','1.5.5','1.5.6','1.5.7','1.7.1','1.7.2','1.7.3','1.7.4','1.7.5','1.7.6','1.7.7') THEN CIS2.NVAL(D.COL1) ELSE 0 END))>=1 AND 
  
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.11.%') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2) ELSE 0 END))=0
  ) 
  
--   OR
  
--  (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND 
--  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND IN ('1.11.1','1.11.2') THEN CIS2.NVAL(D.COL2) ELSE 0 END))=2
--  ) 
  
   OR
-- 
-- ----------------------------------    
--  (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND 
--  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND IN ('1.11.1','1.11.2') THEN CIS2.NVAL(D.COL2) ELSE 0 END))<>2 AND
--  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.12.%') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2)+CIS2.NVAL(D.COL3) ELSE 0 END))<1
--  ) 
  --ALTA VERS 28.05
  
 (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND 
 (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND IN ('1.11.1','1.11.2') THEN CIS2.NVAL(D.COL2) ELSE 0 END))<>2 AND
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.10%') THEN CIS2.NVAL(D.COL1) ELSE 0 END))=0) AND
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.12.%') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2)+CIS2.NVAL(D.COL3) ELSE 0 END))<1
  ) 
    
--   OR 
--   
--  (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND 
--  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND IN ('1.11.1','1.11.2') THEN CIS2.NVAL(D.COL2) ELSE 0 END))<>2 AND
--  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.12.2') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2)+CIS2.NVAL(D.COL3) ELSE 0 END))=0
--  ) 
--    
--   OR
--    (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND 
--    CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND IN ('1.11.1','1.11.2') THEN CIS2.NVAL(D.COL2) ELSE 0 END))<>2 AND
--    CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.12.3') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2)+CIS2.NVAL(D.COL3) ELSE 0 END))=0
--    ) 
--    
--   OR (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND 
--   CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND IN ('1.11.1','1.11.2') THEN CIS2.NVAL(D.COL2) ELSE 0 END))<>2 AND
--   CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.12.4') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2)+CIS2.NVAL(D.COL3) ELSE 0 END))=0
--  ) 
--    
--   OR
--   (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND 
--   CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND IN ('1.11.1','1.11.2') THEN CIS2.NVAL(D.COL2) ELSE 0 END))<>2 AND
--   CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.12.5') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2)+CIS2.NVAL(D.COL3) ELSE 0 END))=0
--   )  
--        
--   OR
--  (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND
--   CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND IN ('1.11.1','1.11.2') THEN CIS2.NVAL(D.COL2) ELSE 0 END))<>2 AND 
--   CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.12.6') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2)+CIS2.NVAL(D.COL3) ELSE 0 END))=0
--   ) 
--    
--   OR
--  (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND 
--   CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND IN ('1.11.1','1.11.2') THEN CIS2.NVAL(D.COL2) ELSE 0 END))<>2 AND
--   CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.12.7') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2)+CIS2.NVAL(D.COL3) ELSE 0 END))=0
--   ) 
--    
--   OR
--  (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND
--   CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND IN ('1.11.1','1.11.2') THEN CIS2.NVAL(D.COL2) ELSE 0 END))<>2 AND
--   CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.12.8') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2)+CIS2.NVAL(D.COL3) ELSE 0 END))=0
--   ) 
--    
--   OR
--  (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND 
--   CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND IN ('1.11.1','1.11.2') THEN CIS2.NVAL(D.COL2) ELSE 0 END))<>2 AND
--   CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.12.9') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2)+CIS2.NVAL(D.COL3) ELSE 0 END))=0
--   ) 

   OR
 ------------------------------------------
--  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('2.1.%') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2)+CIS2.NVAL(D.COL3)+CIS2.NVAL(D.COL4)+CIS2.NVAL(D.COL5) ELSE 0 END))<4 AND
--    (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.1.%') THEN CIS2.NVAL(D.COL2) ELSE 0 END))=2 AND
--     CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.5.%') THEN CIS2.NVAL(D.COL2) ELSE 0 END))=7 AND
--     CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.7.%') THEN CIS2.NVAL(D.COL2) ELSE 0 END))=5 AND
--     CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.10.%') THEN CIS2.NVAL(D.COL1) ELSE 0 END))>1 )   
   ---Varianta  1 de trecere la Cap 2
  
  (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1'  THEN 1 ELSE 0 END))>0 AND 
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('2.1.%') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2)+CIS2.NVAL(D.COL3)+CIS2.NVAL(D.COL4)+CIS2.NVAL(D.COL5) ELSE 0 END))<4 AND
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.1.%') THEN CIS2.NVAL(D.COL2) ELSE 0 END))=2 AND
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.5.%') THEN CIS2.NVAL(D.COL2) ELSE 0 END))=7 AND
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.7.%') THEN CIS2.NVAL(D.COL2) ELSE 0 END))=5 AND
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('1.10.%') THEN CIS2.NVAL(D.COL1) ELSE 0 END))>=1 )

   OR
   ----Varianta 2
 (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1'  THEN 1 ELSE 0 END))>0 AND 
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('2.1.%') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2)+CIS2.NVAL(D.COL3)+CIS2.NVAL(D.COL4)+CIS2.NVAL(D.COL5) ELSE 0 END))<4 
    ) 
   OR 
  
  (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1'  THEN 1 ELSE 0 END))>0 AND 
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('2.2.%') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2)+CIS2.NVAL(D.COL3)+CIS2.NVAL(D.COL4) ELSE 0 END))<8
  ) 
 OR
  
 (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1'   THEN 1 ELSE 0 END))>0 AND 
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND LIKE ('3.1.%') THEN CIS2.NVAL(D.COL1)+CIS2.NVAL(D.COL2)+CIS2.NVAL(D.COL3)ELSE 0 END))<12
  ) 

 OR
  
 (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND 
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND IN ('4.1')   THEN 1 ELSE 0 END))=0 
  ) 

 OR
  
 (CIS2.NVAL(SUM(CASE WHEN D.CAPITOL||'.'||D.RIND||'.'||D.COL1='100.01.1' THEN 1 ELSE 0 END))>0 AND 
  CIS2.NVAL(SUM(CASE WHEN D.CAPITOL NOT IN (100) AND D.RIND IN ('4.2')   THEN 1 ELSE 0 END))=0
  ) 
