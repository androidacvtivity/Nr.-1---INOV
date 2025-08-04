CREATE TABLE USER_BANCU.F_XML_FORMS
(
  ID              NUMBER,
  FORMID              NUMBER,
  XML                 CLOB                      ,
  STATUS              NUMBER                    ,
  FORM_TYPE           VARCHAR2(50 BYTE),
  DATA_REG            DATE,
  CHECK_CONFIRM       NUMBER,
  MESAJ               VARCHAR2(4000 BYTE),
  CUIIO               NUMBER,
  SEND_REQUEST        NUMBER,
  SEND_ATTEMPTS       NUMBER,
  PROCESSING_MESSAGE  VARCHAR2(4000 BYTE)
)
LOB (XML) STORE AS BASICFILE (
  TABLESPACE  TBS_DTI_USERS
  ENABLE      STORAGE IN ROW
  CHUNK       8192
  PCTVERSION  10
  NOCACHE
  LOGGING
      STORAGE    (
                  INITIAL          64K
                  NEXT             1M
                  MINEXTENTS       1
                  MAXEXTENTS       UNLIMITED
                  PCTINCREASE      0
                  BUFFER_POOL      DEFAULT
                 ))
TABLESPACE TBS_DTI_USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
MONITORING;