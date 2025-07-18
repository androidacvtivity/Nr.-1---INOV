SELECT FC.CUIIO,
     --  FC.CUIIO_VERS,
       R.CUATM,
       L.IDNO  RIND
              FROM(
SELECT FC.CUIIO,
                   FC.CUIIO_VERS,
                   FC.FORM,
                   FC.FORM_VERS,
                   FC.STATUT
              FROM CIS2.FORM_CUIIO  FC
                   INNER JOIN (  SELECT CUIIO, MAX (CUIIO_VERS) CUIIO_VERS
                                   FROM CIS2.FORM_CUIIO
                                  WHERE FORM IN (:pFORM) AND CUIIO_VERS <= :pPERIOADA
                                  
                               GROUP BY CUIIO) BB
                       ON (    BB.CUIIO = FC.CUIIO
                           AND BB.CUIIO_VERS = FC.CUIIO_VERS)
             WHERE 
             FC.FORM IN (:pFORM) AND FC.STATUT <> '3'
  
             
             ) FC
             
                    INNER JOIN CIS2.RENIM R ON R.CUIIO = FC.CUIIO AND R.CUIIO_VERS = FC.CUIIO_VERS
                    
                   LEFT JOIN USER_BANCU.INOV_1 L ON L.CUIIO = FC.CUIIO         
 


GROUP BY
FC.CUIIO,
     --  FC.CUIIO_VERS,
       R.CUATM,
       L.IDNO             

HAVING 

L.IDNO IS NOT NULL


ORDER BY
R.CUATM 