SELECT
 CASE WHEN ((
SUM(CASE WHEN D.CAPITOL||'.'||D.RIND IN ('1041.2.1.1','1041.2.1.2','1041.2.2.1','1041.2.2.2','1041.2.2.3','1041.2.2.4','1041.2.3.1','1041.2.3.2'
,'1041.2.3.3','1041.2.3.4','1041.2.3.5','1041.2.3.6','1041.2.4.1','1041.2.4.2','1041.2.4.3','1042.3.1','1042.3.1.1','1042.3.1.2','1042.3.1.3'
,'1042.3.2.1','1042.3.2.2','1042.3.2.3','1042.3.2.4','1042.3.3','1043.4.1','1043.4.1.1','1043.4.1.2','1044.5.1.1','1044.5.1.2','1044.5.1.3'
,'1044.5.1.4','1044.5.1.5','1044.5.1.6','1044.5.1.7','1044.5.1.8','1044.5.1.9','1044.5.1.10','1044.5.2.1','1044.5.2.2','1044.5.2.3','1044.5.2.4'
,'1044.5.2.5','1044.5.2.6','1044.5.3.1','1044.5.3.2','1044.5.3.3','1045.6.1.1','1045.6.2.1','1045.6.2.2','1045.6.2.3','1045.6.2.4','1045.6.2.5','1045.6.2.6'
,'1045.6.2.7','1045.6.2.8','1046.7.1.1','1046.7.1.2','1046.7.1.3','1047.8.1.1','1047.8.1.2','1047.8.1.3','1047.8.1.4')  AND NVAL(D.COL1)  = 1 THEN 1 ELSE 0   END) = 1


  
AND 
    

 (
 SUM (CASE WHEN D.CAPITOL||'.'||D.RIND IN ('1048.9.2')  THEN LENGTHC  (D.COL31)     ELSE  0  END)  < 10
 OR 
 SUM(CASE WHEN D.CAPITOL||'.'||D.RIND IN ('1048.9.2') AND  LENGTHC(D.COL31) = 0 THEN 1    ELSE 0    END)  =  1
  
 
 ) ) )  
 THEN 'Descrierea Inovarii este obligatoei si  trebuie să conțină nu mai putin  10  si nu mai mult de 380 de caractere' 
 
 ELSE  'Daca este Descrierea Inovarii atunci trebuie completate rând. 2.1.1, până la 8.1.4 inclusiv'
 END  
 
 AS REZULTAT
  

  

FROM
  CIS2.VW_DATA_ALL_TEMP D
WHERE
  (D.PERIOADA=:PERIOADA          ) AND
  (D.CUIIO=:CUIIO                ) AND
  (D.CUIIO_VERS=:CUIIO_VERS     OR :CUIIO_VERS = -1) AND
  (D.FORM = :FORM               ) AND
  (D.FORM_VERS=:FORM_VERS ) AND
  (:CAPITOL = :CAPITOL           OR :CAPITOL <>  :CAPITOL) AND
  (:CAPITOL_VERS = :CAPITOL_VERS OR :CAPITOL_VERS <> :CAPITOL_VERS) AND
  (D.ID_MD=:ID_MD               OR :ID_MD = -1) AND
  
  D.FORM IN (48)  

HAVING

(
SUM(CASE WHEN D.CAPITOL||'.'||D.RIND IN ('1041.2.1.1','1041.2.1.2','1041.2.2.1','1041.2.2.2','1041.2.2.3','1041.2.2.4','1041.2.3.1','1041.2.3.2'
,'1041.2.3.3','1041.2.3.4','1041.2.3.5','1041.2.3.6','1041.2.4.1','1041.2.4.2','1041.2.4.3','1042.3.1','1042.3.1.1','1042.3.1.2','1042.3.1.3'
,'1042.3.2.1','1042.3.2.2','1042.3.2.3','1042.3.2.4','1042.3.3','1043.4.1','1043.4.1.1','1043.4.1.2','1044.5.1.1','1044.5.1.2','1044.5.1.3'
,'1044.5.1.4','1044.5.1.5','1044.5.1.6','1044.5.1.7','1044.5.1.8','1044.5.1.9','1044.5.1.10','1044.5.2.1','1044.5.2.2','1044.5.2.3','1044.5.2.4'
,'1044.5.2.5','1044.5.2.6','1044.5.3.1','1044.5.3.2','1044.5.3.3','1045.6.1.1','1045.6.2.1','1045.6.2.2','1045.6.2.3','1045.6.2.4','1045.6.2.5','1045.6.2.6'
,'1045.6.2.7','1045.6.2.8','1046.7.1.1','1046.7.1.2','1046.7.1.3','1047.8.1.1','1047.8.1.2','1047.8.1.3','1047.8.1.4')  AND NVAL(D.COL1)  = 1 THEN 1 ELSE 0   END) = 1


  
AND 
    

 (
 SUM (CASE WHEN D.CAPITOL||'.'||D.RIND IN ('1048.9.2')  THEN LENGTHC  (D.COL31)     ELSE  0  END)  < 10
 OR 
 SUM(CASE WHEN D.CAPITOL||'.'||D.RIND IN ('1048.9.2') AND  LENGTHC(D.COL31) = 0 THEN 1    ELSE 0    END)  =  1
  
 
 ) ) 
 
 
 OR 
 
 
 (
SUM(CASE WHEN D.CAPITOL||'.'||D.RIND IN ('1041.2.1.1','1041.2.1.2','1041.2.2.1','1041.2.2.2','1041.2.2.3','1041.2.2.4','1041.2.3.1','1041.2.3.2'
,'1041.2.3.3','1041.2.3.4','1041.2.3.5','1041.2.3.6','1041.2.4.1','1041.2.4.2','1041.2.4.3','1042.3.1','1042.3.1.1','1042.3.1.2','1042.3.1.3'
,'1042.3.2.1','1042.3.2.2','1042.3.2.3','1042.3.2.4','1042.3.3','1043.4.1','1043.4.1.1','1043.4.1.2','1044.5.1.1','1044.5.1.2','1044.5.1.3'
,'1044.5.1.4','1044.5.1.5','1044.5.1.6','1044.5.1.7','1044.5.1.8','1044.5.1.9','1044.5.1.10','1044.5.2.1','1044.5.2.2','1044.5.2.3','1044.5.2.4'
,'1044.5.2.5','1044.5.2.6','1044.5.3.1','1044.5.3.2','1044.5.3.3','1045.6.1.1','1045.6.2.1','1045.6.2.2','1045.6.2.3','1045.6.2.4','1045.6.2.5','1045.6.2.6'
,'1045.6.2.7','1045.6.2.8','1046.7.1.1','1046.7.1.2','1046.7.1.3','1047.8.1.1','1047.8.1.2','1047.8.1.3','1047.8.1.4')  AND NVAL(D.COL1)  = 1 THEN 1 ELSE 0   END) = 0


  
AND 
    

 (
 SUM (CASE WHEN D.CAPITOL||'.'||D.RIND IN ('1048.9.2')  THEN NVAL(LENGTHC(D.COL31))   ELSE  0  END)  > 0
 OR 
 SUM(CASE WHEN D.CAPITOL||'.'||D.RIND IN ('1048.9.2') AND  NVAL(LENGTHC(D.COL31)) > 0 THEN 1    ELSE 0    END)  =  1
  
 
 ) ) 
  
  
