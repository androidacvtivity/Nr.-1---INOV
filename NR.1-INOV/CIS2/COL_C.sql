SELECT 
NR_ROW,
SUM(COL2) AS COL1,
SUM(COL1) AS COL2
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
      T.ID_MDTABLE = 14500  AND      
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
      T.ID_MDTABLE = 14496  AND      
      T.PERIOADA = (:pPERIOADA)
      
      )
      
        GROUP BY
        NR_ROW

