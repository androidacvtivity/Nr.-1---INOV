DECLARE
  CURSOR UPD_TABLE_OUT_AC IS
    
    SELECT 
 T.NR_ROW,
 SUM(T.COL1) AS COL1,
 SUM(T.COL2) AS COL2
FROM
(
 SELECT
      T.NR_ROW,
      T.COL1 AS COL1,
      T.COL2 AS COL2
    FROM CIS2.TABLE_OUT T
    WHERE
      T.COD_CUATM IN (:pCOD_CUATM)  AND
      T.FORM = :pFORM         AND
      T.ID_MDTABLE = (CASE 
      WHEN :pPERIOADA = 1065 THEN  13752 
      WHEN :pPERIOADA IN  (1066,1067) THEN  13778
      WHEN :pPERIOADA IN  (1068) THEN  14386 
      WHEN :pPERIOADA  > 1068 THEN 14492 END )  AND      
      T.PERIOADA = (:pPERIOADA-4)
    
      
      )  T
      
      GROUP BY
      
     T.NR_ROW
    
    
    
      ;
      
    

BEGIN
    FOR C IN UPD_TABLE_OUT_AC LOOP
        UPDATE CIS2.TABLE_OUT 
        SET
            COL1 = C.COL1,
            COL2 = C.COL2
        WHERE 
          NR_ROW = C.NR_ROW    AND
          COD_CUATM IN (:pCOD_CUATM)   AND
          PERIOADA IN (:pPERIOADA)     AND 
          ID_MDTABLE=:pID_MDTABLE AND 
          FORM IN (:pFORM)             AND
          FORM_VERS IN (:pFORM_VERS); 
          
    END LOOP;  
END;