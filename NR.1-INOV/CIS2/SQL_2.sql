DECLARE
  CURSOR UPD_TABLE_OUT_AC IS
    
    SELECT 
NR_ROW,
SUM(COL1) AS COL1,
SUM(COL2) AS COL2
FROM
(
SELECT
      T.NR_ROW,
      T.COL1 AS COL1,
      NULL AS COL2
 
    FROM CIS2.TABLE_OUT T
    WHERE
      T.COD_CUATM IN (:pCOD_CUATM)  AND
      T.FORM = :pFORM         AND
      T.ID_MDTABLE = 14497  AND      
      T.PERIOADA = (:pPERIOADA)
      
      
      UNION ALL 
      
      SELECT
      T.NR_ROW,
      NULL AS COL1,
      T.COL1 AS COL2
 
    FROM CIS2.TABLE_OUT T
    WHERE
      T.COD_CUATM IN (:pCOD_CUATM)  AND
      T.FORM = :pFORM         AND
      T.ID_MDTABLE = 14501  AND      
      T.PERIOADA = (:pPERIOADA)
      
      )
      
        GROUP BY
        NR_ROW


    
    
    
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