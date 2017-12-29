import math
def assertEquals(expect, actual, epsilon=1e-3):
    success = True
    if type(expect) == int and type(actual) == int:
        success = (expect == actual)
    else:
        success = math.isclose(expect, actual, rel_tol=epsilon)
    if not success:
        print("FAILED!!! expect ({}), but actual ({})".format(expect, actual))

def assertTrue(cond, msg=None):
    if not cond:
        if msg == None:
            print("FAILED!!! assertTrue receives non-True value")
        else:
            print("FAILED!!! assertTrue: {}".format(msg))

         

