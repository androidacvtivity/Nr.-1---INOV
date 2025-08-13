SELECT
      T.NR_ROW,
      T.COL1 AS COL1
 
    FROM CIS2.TABLE_OUT T
    WHERE
      T.COD_CUATM IN (:pCOD_CUATM)  AND
      T.FORM = :pFORM         AND
      T.ID_MDTABLE = 14500  AND      
      T.PERIOADA = (:pPERIOADA)
      ;
      
    

